
import API from "./api";


export const getEvents = async () => {
  const response = await API.get("/events");
  return response.data;
};


export const createEvent = async (eventData) => {
  const response = await API.post("/events", eventData);
  return response.data;
};

