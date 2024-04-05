import React from "react";

interface Category {
  id: number;
  name: string;
  image: string;
}

const CategoryCard: React.FC<Category> = (category) => {
  return (
    <>
      <div className="relative aspect-w-16  max-w-sm m-[1px] border rounded-lg shadow bg-black">
        <div
          className="absolute backdrop-blur-lg bg-black/100 inset-0 bg-no-repeat bg-center bg-cover rounded-lg"
          style={{
            backgroundImage: `url(https://easyeventsbackend-pwa.onrender.com/uploads/${category.image})`,
          }}
        />
        <div className="p-5 relative z-10">
          <h5 className="mb-2 truncate text-lg font-bold tracking-tight text-white md:text-2xl sm:text-3xl xs:text-3xl">
            {category.name}
          </h5>
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
