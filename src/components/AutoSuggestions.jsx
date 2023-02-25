export default function AutoSuggestions({
  setAddress,
  suggestionsData,
  setSuggestionsData,
  focus,
}) {
  console.log("suggestions", suggestionsData);
  return (
    focus &&
    suggestionsData?.length !== 0 && (
      <div className="absolute top-10 text-center w-full bg-gray-300 z-10">
        {suggestionsData?.map((item) => {
          return (
            <p
              key={item.id}
              className="cursor-pointer hover:bg-slate-500"
              onClick={() => {
                setAddress(item.address.label);
                setSuggestionsData(null);
              }}
            >
              {item.address.label}
            </p>
          );
        })}
      </div>
    )
  );
}
