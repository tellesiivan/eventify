type Props = {};

const Home = (props: Props) => {
  return (
    <div className="flex flex-row w-full h-full">
      <div className="relative w-1/2 h-full bg-razz-200">
        <img
          src="https://images.unsplash.com/photo-1574314539323-d4d3691c6eeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          alt=""
          className="absolute inset-0 object-cover object-center w-full h-full"
        />
      </div>
      <div className="flex items-center justify-center flex-1 h-full bg-primary-600">
        <div className="rounded-md w-60 h-60 bg-primary-500"></div>
      </div>
    </div>
  );
};

export default Home;
