export const reactSelectStyle = {
  control: ({ base, state }: any) => ({
    ...base,
    border: state ? "0.1rem solid var(--blue-color)" : "0.1rem solid #DDE2E4",
    // backgroundColor: state.isSelected ? "#DDE2E4" : "white",
    boxShadow: state ? "0.1rem solid var(--blue-color)" : 0,
    "&:hover": {
      // border: state ? 0 : 0
    },
  }),
  multiValue: ({ base }: any) => ({
    ...base,
    backgroundColor: "var(--blue-color)",
  }),
  option: ({ provided, state }: any) => ({
    ...provided,
    backgroundColor: state ? "var(--blue-color)" : "white",
  }),
};
