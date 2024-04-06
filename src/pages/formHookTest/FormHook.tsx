import React from "react";
import { FieldErrors, useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormData = {
  email: string;
  username: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phoneNumbers: string[];
  address: {
    city: string;
    country: string;
  }[];
  age: number;
  dob: Date;
};
const FormHook = () => {
  const form = useForm<FormData>({
    defaultValues: {
      email: "demo@demo.com",
      username: "demo",
      name: {
        firstname: "",
        lastname: "",
      },
      phoneNumbers: ["", ""],
      address: [{ city: "city1", country: "country1" }],
      age: 0,
      dob: new Date(),
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
  } = form;
  const {
    errors,
    dirtyFields,
    touchedFields,
    isValid,
    isDirty,
    isSubmitSuccessful,
    isSubmitted,
    isSubmitting,
  } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "address",
    control,
  });

  const onError = (errors: FieldErrors<FormData>) => {
    console.log("=============errors===============");
    console.log(errors);
    console.log("=============errors================");
  };

  const username = watch("username");
  const submithandler = (data: FormData) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(submithandler, onError)} noValidate>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "enter valid mail ",
              },
              validate: {
                notAdmin: (value) => {
                  return value !== "s@s.com" || "Cannot take that mail";
                },
                notBlocked: (value) => {
                  return value !== "blocked@s.com" || "Email is blocked";
                },
              },
            })}
          />
          <p className="text-red-600">{errors.email?.message}</p>
        </div>
        <div>
          <label htmlFor="username">Username : {username}</label>
          <input type="username" id="username" {...register("username")} />
        </div>
        <div>
          <label htmlFor="firstname">firstname</label>
          <input
            type="firstname"
            id="firstname"
            {...register("name.firstname")}
          />
        </div>
        <div>
          <label htmlFor="lastname">lastname</label>
          <input type="lastname" id="lastname" {...register("name.lastname")} />
        </div>
        <div>
          <label htmlFor="phoneno-primary">phoneno</label>
          <input
            type="text"
            id="phoneno-primary"
            {...register("phoneNumbers.0")}
          />
        </div>
        <div>
          <label htmlFor="phoneno-secondary">phoneno2</label>
          <input
            type="text"
            id="phoneno-secondary"
            {...register("phoneNumbers.1")}
          />
        </div>
        <div>
          {fields.map((field, index) => {
            return (
              <>
                <div>
                  <input
                    type="text"
                    key={index}
                    {...register(`address.${index}.country`)}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    key={index}
                    {...register(`address.${index}.city`, {
                      disabled: watch(`address.${index}.country`) === "",
                    })}
                  />
                </div>

                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      return remove(index);
                    }}
                  >
                    remove address
                  </button>
                )}
              </>
            );
          })}
          <button
            type="button"
            onClick={() => {
              return append({
                city: "",
                country: "",
              });
            }}
          >
            Add new address
          </button>
        </div>
        <div>
          <label htmlFor="age">age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
            })}
          />
        </div>
        <div>
          <label htmlFor="dob">dob</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
            })}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
          <button disabled={!isDirty || !isValid || isSubmitting} type="submit">
            Submit
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default FormHook;
