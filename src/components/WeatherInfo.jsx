function WeatherInfo({icon, value, label}) {
  return (
    <div className="flex items-center place-content-center p-1 w-38 h-20">
      <img
        src={icon}
        className=" w-14 h-14 mx-1"
        alt={label}
      />
      <div className="flex flex-col text-lg">
        <p>{value}</p>
        <p>{label}</p>
      </div>
    </div>
  );
}

export default WeatherInfo;
