const ShowError = ({ text }: { text?: string }) => {
  if(!text) return null;
  return <div className="text-rose-800 text-[1rem]">{text}</div>
}

export default ShowError;