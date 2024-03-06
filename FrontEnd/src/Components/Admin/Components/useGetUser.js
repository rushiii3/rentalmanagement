import axios from "axios";
import { useState, useEffect } from "react";
import { userServer } from "../../../server";
const useGetUser = (apiEndpoint) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      if (apiEndpoint) {
        try {
          const { data } = await axios.get(`${userServer}/get-details/${apiEndpoint}`);
          console.log();
          const usermap = data.users.map((value)=>({
            id: value?._id,
            name: `${value?.firstname} ${value?.middlename} ${value?.lastname} `,
            role: value?.role,
            phonenumber: value?.phoneNumber,
            avatar: `${value?.avatar?.url}`,
            email: value?.email,
            streetname: value?.address?.streetname,
            city: value?.address?.city,
            state: value?.address?.state,
            pincode: value?.address?.pincode,
            creditpoint: value?.creditPoint
          }))
          console.log(usermap);
          setUsers(usermap);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching users:", error);
          setLoading(false);
        }
      }
    };
    fetchData();
  }, []);

  return { users, loading };
}

export default useGetUser;
