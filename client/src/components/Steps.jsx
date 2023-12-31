const Steps = ({ img, title, index }) => {
  return (
    <div className="w-full mt-8 flex items-center min-h-[400px] flex-col lg:even:flex-row-reverse lg:odd:flex-row transition-all dark:bg-slate-900">
      <div className="flex-1">
        <div className="image w-8/12 mx-auto">
          <img src={img} alt="" className="w-full object-cover object-center" />
        </div>
      </div>
      <div className="flex-1">
        <h5 className="text-slate-800 mb-3 dark:text-gray-200">
          Step{index + 1}:
        </h5>
        <p className="text-slate-600 dark:text-gray-200">{title}</p>
      </div>
    </div>
  );
};

export default Steps;
