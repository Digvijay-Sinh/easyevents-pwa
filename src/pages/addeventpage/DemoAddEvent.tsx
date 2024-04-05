import axios from "axios";
import { Button } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  start_date_toRegister: string;
  end_date_toRegister: string;
  mode: "ONLINE" | "OFFLINE";
  capacity: number;
  price: number;
  organizer_id: number;
  venue_id: number;
  category_id: number;
  type_id: number;
  speaker_ids: string;
  image_urls: string;
};

type EventType = {
  id: number;
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
  start_date_toRegister: Date;
  end_date_toRegister: Date;
  mode: string;
  capacity: number;
  price: number;
  organizer_id: number;
  venue_id: number;
  category_id: number;
  type_id: number;
};

const DemoAddEvent = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const form = useForm<FormData>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const getEvents = async () => {
    try {
      const response = await axios("http://localhost:5000/api/v1/events");
      const data = await response.data;
      setEvents(data);
      console.log("Events:", data);

      // Get the user's current timezone
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const convertedTimestamp = new Date(events[9].start_date);

      const convertedTimestampInUserTimezone =
        convertedTimestamp.toLocaleString("en-US", { timeZone: userTimezone });

      console.log(
        "Converted timestamp in user's timezone:",
        convertedTimestampInUserTimezone
      );
      console.log("Event ID:", events[9].id);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      // Transform speaker_ids and image_urls from comma-separated strings to arrays
      console.log("====================================");
      console.log(data);
      console.log("====================================");
      const transformedData = {
        ...data,
        speakers: data.speaker_ids.split(",").map(Number),
        images: data.image_urls.split(","),
        start_date: new Date(data.start_date).toISOString(),
        end_date: new Date(data.end_date).toISOString(),
        start_date_toRegister: new Date(
          data.start_date_toRegister
        ).toISOString(),
        end_date_toRegister: new Date(data.end_date_toRegister).toISOString(),
      };

      const response = await fetch("http://localhost:5000/createEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedData),
      });
      const responseData = await response.json();
      console.log("Event created:", responseData);
      // Optionally, redirect to another page or display a success message
    } catch (error) {
      console.error("Error creating event:", error);
      // Handle errors, e.g., display an error message
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Title:</label>
      <input type="text" {...register("title", { required: true })} />
      {errors.title && <span>Title is required</span>}

      {/* Other fields */}

      <label>Description:</label>
      <textarea {...register("description", { required: true })} />
      {errors.description && <span>Description is required</span>}

      <label>Start Date:</label>
      <input
        type="datetime-local"
        {...register("start_date", { required: true })}
      />
      {errors.start_date && <span>Start Date is required</span>}

      <label>End Date:</label>
      <input
        type="datetime-local"
        {...register("end_date", { required: true })}
      />
      {errors.end_date && <span>End Date is required</span>}

      <label>Start Date to Register:</label>
      <input
        type="datetime-local"
        {...register("start_date_toRegister", { required: true })}
      />
      {errors.start_date_toRegister && (
        <span>Start Date to Register is required</span>
      )}

      <label>End Date to Register:</label>
      <input
        type="datetime-local"
        {...register("end_date_toRegister", { required: true })}
      />
      {errors.end_date_toRegister && (
        <span>End Date to Register is required</span>
      )}

      <label>Mode (Online/Offline):</label>
      <select {...register("mode", { required: true })}>
        <option value="ONLINE">Online</option>
        <option value="OFFLINE">Offline</option>
      </select>
      {errors.mode && <span>Mode is required</span>}

      <label>Capacity:</label>
      <input
        type="number"
        {...register("capacity", { required: true, valueAsNumber: true })}
      />
      {errors.capacity && <span>Capacity is required</span>}

      <label>Price:</label>
      <input
        type="number"
        step="0.01"
        {...register("price", { required: true, valueAsNumber: true })}
      />
      {errors.price && <span>Price is required</span>}

      <label>Organizer ID:</label>
      <input type="number" {...register("organizer_id", { required: true })} />
      {errors.organizer_id && <span>Organizer ID is required</span>}

      <label>Venue ID:</label>
      <input type="number" {...register("venue_id", { required: true })} />
      {errors.venue_id && <span>Venue ID is required</span>}

      <label>Category ID:</label>
      <input type="number" {...register("category_id", { required: true })} />
      {errors.category_id && <span>Category ID is required</span>}

      <label>Type ID:</label>
      <input type="number" {...register("type_id", { required: true })} />
      {errors.type_id && <span>Type ID is required</span>}

      <label>Speaker IDs (comma-separated):</label>
      <input type="text" {...register("speaker_ids", { required: true })} />
      {errors.speaker_ids && <span>Speaker IDs are required</span>}

      <label>Image URLs (comma-separated):</label>
      <input type="text" {...register("image_urls", { required: true })} />
      {errors.image_urls && <span>Image URLs are required</span>}

      <button type="submit">Create Event</button>

      <div>
        <Button onClick={getEvents}>Get events</Button>
      </div>
    </form>
  );
};

export default DemoAddEvent;
