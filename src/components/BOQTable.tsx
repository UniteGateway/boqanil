interface BOQTableRow {
  item: string;
  specification?: string;
  quantity?: string;
}

interface BOQTableProps {
  headers: string[];
  rows: BOQTableRow[];
}

export function BOQTable({ headers, rows }: BOQTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {headers.map((header, index) => (
              <th
                key={index}
                className="text-left py-3 px-4 font-semibold text-muted-foreground uppercase tracking-wider text-xs"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className="border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors"
            >
              <td className="py-3 px-4 font-medium text-foreground">{row.item}</td>
              {row.specification && (
                <td className="py-3 px-4 text-muted-foreground">{row.specification}</td>
              )}
              {row.quantity && (
                <td className="py-3 px-4 font-mono text-foreground">{row.quantity}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
