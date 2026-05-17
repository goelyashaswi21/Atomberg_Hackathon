"use client";
import { format } from "date-fns";

export function AuditDataTable({ logs }: { logs: any[] }) {
  if (!logs || logs.length === 0) {
     return <div className="p-8 text-center text-muted-foreground border border-border rounded-xl">No audit logs found.</div>;
  }

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-background shadow-sm">
       <div className="overflow-x-auto">
         <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-secondary/50 border-b border-border text-[10px] tracking-widest text-muted-foreground uppercase">
               <tr>
                  <th className="py-4 px-6 font-bold">Timestamp</th>
                  <th className="py-4 px-6 font-bold">Actor</th>
                  <th className="py-4 px-6 font-bold">Entity</th>
                  <th className="py-4 px-6 font-bold">Action</th>
                  <th className="py-4 px-6 font-bold w-full">Payload Snapshot</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
               {logs.map((log) => (
                 <tr key={log.id} className="hover:bg-secondary/40 transition-colors">
                    <td className="py-4 px-6 text-muted-foreground font-mono text-xs">{format(new Date(log.createdAt), "MMM d, yyyy HH:mm:ss")}</td>
                    <td className="py-4 px-6 font-medium text-foreground">{log.actor?.name || "System"}</td>
                    <td className="py-4 px-6">
                       <span className="bg-secondary text-foreground border border-border px-2 py-1 rounded text-[10px] uppercase font-bold tracking-widest">
                          {log.entity}
                       </span>
                    </td>
                    <td className="py-4 px-6">
                       <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-widest border
                          ${log.action === 'APPROVE' ? 'bg-success/10 text-success border-success/20' : 
                            log.action === 'REWORK' ? 'bg-warning/10 text-warning border-warning/20' : 
                            log.action === 'UPDATE' ? 'bg-primary/10 text-primary border-primary/20' : 
                            'bg-destructive/10 text-destructive border-destructive/20'}`}
                       >
                          {log.action}
                       </span>
                    </td>
                    <td className="py-4 px-6 text-[11px] font-mono text-muted-foreground truncate max-w-[300px]" title={log.newValue || log.prevValue}>
                       {log.newValue || log.prevValue || "No changes recorded"}
                    </td>
                 </tr>
               ))}
            </tbody>
         </table>
       </div>
    </div>
  )
}
