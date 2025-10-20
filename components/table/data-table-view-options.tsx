/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Table } from "@tanstack/react-table"
import { Settings2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useI18n } from "@/hooks/use-i18n"

export function DataTableViewOptions<TData>({
  table,
}: {
  table: Table<TData>
}) {

  const {t} = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto h-8 lg:flex"
        >
          <Settings2 />
          {t("table_view_option")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-auto px-3">
        <DropdownMenuLabel>{t("table_toggle_columns")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value: any) => column.toggleVisibility(!!value)}
              >
                {(column.columnDef.meta as any)?.label ?? column.id}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
