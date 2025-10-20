/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useNotifications.ts
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';
import { RootState, AppDispatch } from '@/lib/Redux/store';
// import { Notification } from '@/types/notification.type';
import { useGetNotificationsQuery } from '@/lib/Redux/web/endpoints/notifications';
import { addNotification, setNotifications } from '@/lib/Redux/store/notifications.store';

let socket: Socket | null = null;

export function useNotifications() {
  const dispatch = useDispatch<AppDispatch>();
  const notifications = useSelector((state: RootState) => state.notifications.notifications);
  const { data: session } = useSession();

  const { data: initialNotifications, isSuccess } = useGetNotificationsQuery();

  useEffect(() => {
    if (isSuccess && initialNotifications) {
      dispatch(setNotifications(initialNotifications.data));
    }
  }, [isSuccess, initialNotifications, dispatch]);

  useEffect(() => {
    if (!session?.user?.personaId || socket) return;
    
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3030', {
      transports: ['websocket'],
      query: { personaId: session.user.personaId },
    });

    socket.on('connect', () => {
      console.log('🟢 Socket conectado');
    });

    socket.on('disconnect', () => {
      console.log('🔴 Socket desconectado');
    });

    const handleNotification = (notification: any) => {
      dispatch(addNotification(notification));
    };

    socket.on('new-notification', handleNotification);

    return () => {
      socket?.off('new-notification', handleNotification);
    };
  }, [session?.user?.personaId, dispatch]);

  return { notifications };
}
