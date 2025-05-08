import { AreaChart, Area, ResponsiveContainer } from 'recharts';

function StatCard({ title, value, change, trend }) {
  // Adjust graph data to reflect dynamic value and trend
  const baseValue = value === 0 ? 1 : value; // Use 1 as base to avoid flat graph at 0
  const data = [
    { name: '1', value: Math.max(1, baseValue - (trend === 'up' ? 5 : 2)) },
    { name: '2', value: Math.max(1, baseValue - (trend === 'up' ? 3 : 1)) },
    { name: '3', value: Math.max(1, baseValue - (trend === 'up' ? 1 : 0)) },
    { name: '4', value: baseValue },
    { name: '5', value: trend === 'up' ? baseValue + 2 : Math.max(1, baseValue - 2) },
  ];

  // Determine colors based on trend
  const trendColor = trend === 'up' ? 'text-risk-low' : 'text-risk-high';
  const graphColor = trend === 'up' ? '#28A745' : '#FF0000'; // Green for up, red for down

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex-1">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <div className="flex items-center justify-between mt-2">
        <div>
          <p className="text-3xl font-bold text-dark-text">{value}</p>
          <p className={`text-sm ${trendColor} mt-1`}>
            {trend === 'up' ? '↑' : '↓'} {change} vs last semester
          </p>
        </div>
        {/* Trend Graph */}
        <div className="w-24 h-12">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Area
                type="monotone"
                dataKey="value"
                stroke={graphColor}
                fill={graphColor}
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default StatCard;