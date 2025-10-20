"use client";
import { useNotifications } from '@/hooks/use-notification';
import React, { useEffect, useState } from 'react'

export default function PageNotifications() {
 // const { notifications } = useNotifications();
 const [mounted, setMounted] = useState<boolean>(false);
 const { notifications } = useNotifications();

 useEffect(() => {
  setMounted(true);
 }, []);

 useEffect(() => {
  if (!mounted) return;
 }, [mounted])


 if (!mounted) return 'loading...'

 return (
  <div className="p-4 space-y-4">
   <h1 className="text-xl font-bold">Notificaciones en tiempo real</h1>
   <pre>
    {JSON.stringify(notifications, null, 2)}
   </pre>
   {/* {notifications.map((n) => (
    <div key={n.id} className="p-3 border rounded shadow">
     <h2 className="font-semibold">{n.titulo_es || n.titulo_en}</h2>
     <p className="text-sm text-gray-600">{n.descripcion_es || n.descripcion_en}</p>
     <span className="text-xs text-gray-400">{new Date(n.createdat).toLocaleString()}</span>
    </div>
   ))} */}
  </div>
 );
}
