import Dialog from "../Dialog";
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
  return (
    <Dialog>
      <div className="flex flex-col items-center justify-center h-full">
        <CircularProgress size={60}/>
      </div>
    </Dialog>
  )
}

export default Loading