import React, { useState } from "react";

export default function Form(props) {

  const [name,setName]=useState("")
  const [mail,setMail]=useState("")
  const [mobile,setMobile]=useState("")
  const [password,setPassword]=useState("")
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name,mail,mobile,password)
  };
  return (
    <>
      <form>
        <input
          onChange={(e)=>setName(e.target.value)}
          name="name"
          type="text"
          placeholder="Name"
        />
        <input
          onChange={(e)=>setMail(e.target.value)}
          name="email"
          type="text"
          placeholder="Email"
        />
        <input
          onChange={(e)=>setMobile(e.target.value)}
          name="mobile"
          type="text"
          placeholder="Mobile"
        />
        <input
          onChange={(e)=>setPassword(e.target.value)}
          name="password"
          type="text"
          placeholder="Password"
        />
        <button className="bg-amber-500 p-5" onClick={(e)=>handleSubmit(e)}>submit</button>
      </form>
    </>
  );
}
