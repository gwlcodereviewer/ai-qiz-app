import { colors } from "./colors";

const headerCurrentBorderStyle = {
  borderTop: "2px solid white",
  borderLeft: "2px solid white",
  borderBottom: `4px solid ${colors.citrusGreen}`,
};

const headerDefaultBorderStyle = {
  borderTop: "2px solid white",
  borderLeft: "2px solid white",
  borderBottom: `4px solid ${colors.borderBlack}`,
};

const optionBorderStyle = { border: `1px solid ${colors.borderGrey}` };

const textareaStyle = {
  width: "600px",
  height: "130px",
  padding: "20px",
  borderRadius: "25px",
  border: `1px solid ${colors.borderGreyDark}`,
  fontSize: "16px",
  outline: "none",
  resize: "none",
};

const buttonStyle = {
  backgroundColor: colors.backgroundBlack,
  padding: "20px 20px",
  border: "none",
  cursor: "pointer",
  borderRadius: "24px",
  marginTop: "20px",
  width: "600px",
};

const disabledButtonStyle = {
  backgroundColor: colors.backgroundGrey,
  padding: "20px 20px",
  border: "none",
  cursor: "pointer",
  borderRadius: "24px",
  marginTop: "20px",
  width: "600px",
};

export {
  headerCurrentBorderStyle,
  headerDefaultBorderStyle,
  optionBorderStyle,
  textareaStyle,
  buttonStyle,
  disabledButtonStyle,
};
