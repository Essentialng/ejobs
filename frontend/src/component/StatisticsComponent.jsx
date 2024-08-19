
function StatisticsComponent({Logo, statisticNumber, statisticTitle}) {
  return (
    <div className="w-auto">
        <div className="flex items-center gap-2 font-bold text-4xl text-slate-50">
            {Logo}
            <h2>{statisticNumber}</h2>
        </div>
        <h1 className="text-slate-50 text-md">{statisticTitle}</h1>
    </div>
  )
}

export default StatisticsComponent
