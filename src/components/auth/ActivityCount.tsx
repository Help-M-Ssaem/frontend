interface ActivityItem {
  label: string
  count: number
}

interface ActivityCountProps {
  title: string
  items: ActivityItem[]
}

const ActivityCount = ({ title, items }: ActivityCountProps) => {
  return (
    <div className="flex-1">
      <div className="text-title3 text-maindark font-semibold mb-2">
        {title}
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="flex justify-between my-1">
            <span>{item.label}</span>
            <span>{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ActivityCount
