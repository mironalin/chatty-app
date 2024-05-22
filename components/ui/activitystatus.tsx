const ActivityStatus = () => {
  return (
    <div>
      <span className="hidden absolute rounded-full bg-green-500 ring-2 ring-background top-0 right-0 h-2 w-2 md:h-3 md:w-3 dark:block" />
      <span className="absolute rounded-full bg-green-500 ring-2 ring-background top-0 right-0 h-2 w-2 md:h-3 md:w-3 dark:hidden" />
    </div>
  );
};
export default ActivityStatus;
