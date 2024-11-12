
const LoginTemplate = (props) =>{
  return (
    <div className="h-screen w-full flex items-center justify-center bg-main-white">
      <div className="w-100 min-h-100 max-h-106 bg-white rounded-3xl border-gray-200 border-2 p-12">
        {props.children}
        
      </div>
    </div>
  );
};

export default LoginTemplate;