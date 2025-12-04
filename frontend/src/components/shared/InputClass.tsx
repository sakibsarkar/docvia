const InputClass = (hasError: boolean) =>
  `w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
    hasError ? "border-red-400 focus:ring-0" : "border-gray-300"
  }`;

export default InputClass;
