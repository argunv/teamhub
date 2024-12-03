import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getToken } from "./token";
import { useNavigate } from "react-router-dom";

export function useApiQuery(url, setPage, checking = true) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const tokenData = getToken();

        if (checking && (!tokenData || !tokenData.accessToken)) {
            navigate("/login");
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    headers: {
                        Authorization: checking ? `Bearer ${tokenData['accessToken']}` : '',
                    },
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                dispatch(setPage(data));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [url, dispatch, navigate, setPage, checking]);
}