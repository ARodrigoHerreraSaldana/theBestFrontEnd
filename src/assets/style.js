
import { styled } from "@mui/system"; // <--- Add this ✅
export default styled(()=>({ // <--- Add this ✅

  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "rgba(0,183,255, 1)",
  },
  image: {
    marginLeft: "15px",
  },
  tableSortLabel: {
    justifyContent: 'center', // Center-align the TableSortLabel
    display: 'flex',
    width: '100%',
  },
}));
