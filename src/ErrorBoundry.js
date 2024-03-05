import React from "react";
import Button from "./components/Button";

class ErrorBoundary extends React.Component {
  state = {hasError: false};

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='fixed inset-0 h-screen w-screen -z-10 w-100'>
          <div style={{backgroundImage: "url('/assets/Background.png')"}} className='bg-wwlWhite p-6 text-black text-center rounded-xl shadow-wwlDefault h-full flex justify-center items-center flex-col'>
            <div  className='text-4xl font-bold pb-3 font-chivo text-wwlOrange'>Something went wrong!</div>
            <div className='p-3 pb-6 font-chivo'>Oops! There was an error.<br/>Our team has been notified, and we are
              working on a resolution for you!
            </div>
            <Button btnText='Back to Home Page' onClick={() => {
              this.setState({hasError: false})
              window.location.href = '/home'
              }
            }
                    extraClasses={`rounded border-2 border-wwlOrange px-1 py-0.5 sm:px-4 sm:py-2 sm:rounded-lg hover:bg-wwlOrange hover:text-wwlWhite transition-colors duration-300 w-40`}/>
          </div>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;