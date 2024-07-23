
function TestimonialComponent({customerName, customerTitle, customerTestimonial}) {
  return (
    <div className="sm:w-1/3 w-full bg-slate-50 px-10 py-6 text-center">
        <h2 className="text-md font-bold">{customerName}</h2>
        <h1 className="text-sm text-slate-400 my-3">{customerTitle}</h1>
        <p className="text-md">{customerTestimonial}</p>
    </div>
  )
}

export default TestimonialComponent