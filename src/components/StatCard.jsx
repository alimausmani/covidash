const StatCard = ({ title, value, color, percentage }) => {
  const colorClasses = {
    purple: "stat-card-purple",
    green: "stat-card-green",
    red: "stat-card-red",
  };

  return (
    <div className={`stat-card ${colorClasses[color] || ""}`}>
      <div className="stat-info">
        <span className="stat-title">{title}</span>
        <span className="stat-percentage">{percentage}</span>
      </div>
      <div className="stat-value">{value}</div>
    </div>
  );
};

export default StatCard;
