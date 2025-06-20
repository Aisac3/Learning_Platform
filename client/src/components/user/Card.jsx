import React from "react";

const Card = ({course}) => {
  return (
    <div className="card card-side bg-base-100 shadow-sm grid grid-cols-1">
      <figure className="w-full h-48">
        <img
          src={course.image}
          alt="Movie" className="object-cover w-full h-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{course.title}</h2>
        <p>{course.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Watch</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
