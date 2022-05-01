import MasonryLayout from "../components/MasonaryLayout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getNotes, selectNote, reset } from "../features/notes/noteSlice";
import { HiOutlineX } from "react-icons/hi";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector(selectUser);
  const { isSuccess, message } = useSelector(selectNote);

  useEffect(() => {
    if (!user) return navigate("/login");
  }, [navigate, user]);

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && message) {
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }
  }, [reset, isSuccess, message]);

  if (isLoading) return <Spinner />;

  return (
    <div className="bg-secondaryColor pt-12">
      <div className=" relative w-full px-4 md:px8 xl:px-48 h-full min-h-[95vh]">
        {isSuccess && message && (
          <div className="flex justify-between items-center fixed top-[80px] right-[190px] rounded-md shadow-md z-[999] bg-green-200 p-3 w-60 border">
            <p className="text-sm text-green-700 font-medium">{message}</p>
            <HiOutlineX
              className="text-green-700 font-medium cursor-pointer"
              onClick={() => dispatch(reset())}
            />
          </div>
        )}
        <MasonryLayout />
      </div>
    </div>
  );
};
export default Dashboard;
