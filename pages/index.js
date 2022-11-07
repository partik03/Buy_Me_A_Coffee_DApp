import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import * as abi from "/utils/buymeacoffee.json"
import { ethers } from "ethers"
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { SiBuymeacoffee } from "react-icons/si";
export default function Home() {
  const address = process.env.CONTRACT_ADDRESS
  const contract_abi = abi.abi;
  // console.log(contract_abi);
  const [currentAccount, setCurrentAccount] = useState(null)
  const [name, setName] = useState(null)
  const [message, setMessage] = useState(null)
  const [memos, setMemos] = useState([])
  const [connected, setConnected] = useState(false)
  const [value, setValue] = useState(null)

  console.log(value);
  const isWalletConnected = async()=>{
    try {
      const {ethereum} = window;
      if(!ethereum){
        console.log("Make sure you have metamask");
        // return false;
      }
      else {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts"
        })
        if(accounts.length !== 0){
          console.log("Connected",currentAccount);
          setCurrentAccount(accounts[0])
          setConnected(true)
          // return true;
          
        }
        else{
          console.log("Not Connected");
        }
        // setCurrentAccount(accounts[0])
      }
    } catch (error) {
      console.log(error);
    }
  }
  const connectWallet = async()=>{
    try {
      const {ethereum} = window;
      if(!ethereum){
        alert("Get metamask")
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts"
      })
      console.log("Connected", accounts);
      setCurrentAccount(accounts[0])
      setConnected(true)
    } catch (error) {
      console.log(error);
    }
  }
  const buyCoffee = async()=>{
    try {
      const {ethereum} = window;
      if(!ethereum){
        console.log("Make sure you have metamask");
        return;
      }
      else {
        const provider = new ethers.providers.Web3Provider(ethereum,"any");
        const signer = provider.getSigner();
        const contract = new ethers.Contract(address, contract_abi, signer);
        console.log(contract);
        const transaction = await contract.buycoffee(name?name:"Unknown",message?message:"Enjoy Your Coffee",{value: ethers.utils.parseEther((value *0.001).toString())});
        await transaction.wait();
        console.log(`${currentAccount} has bought a coffee`);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const getMemos = async()=>{
    try {
      const {ethereum} = window;
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum,"any");
        const signer = provider.getSigner();
        const contract = new ethers.Contract(address, contract_abi, signer);
        const memos = await contract.getMemos();
        console.log(memos);
        setMemos(memos)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    let buyMeaCoffee;
    isWalletConnected()
    getMemos()
    const onNewMemo =(from,timestamp,name,message)=>{
      console.log(memos);
      setMemos((prevState)=>[
        ...prevState,
        {
          address:from,
         timestamp:new Date(timestamp * 1000),
          message,
          name
        }
      ])
      console.log(memos);
}
const {ethereum} = window;

if(ethereum){

  const provider = new ethers.providers.Web3Provider(ethereum,"any")
  const signer = provider.getSigner();
  buyMeaCoffee= new ethers.Contract(
    address,
    contract_abi,
    signer
  )
  buyMeaCoffee.on("NewMemo",)
}
  return(()=>{
    if(buyMeaCoffee)
    buyMeaCoffee.off("NewMemo",onNewMemo)
  })

  }, [])

  return (
    <div className="">
      <Head>
        <title>Buy Me a Coffee</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='w-screen h-screen'>
        <Navbar connected={connected} connectWallet={connectWallet} account={currentAccount}/>
        <div className="w-screen h-[88%] flex bg-sky-300">
        <div className='w-1/3 h-full pt-10 px-2 '>
          <h1 className='text-2xl font-bold text-center'>Messages from Supporters</h1>
          <div className='h-[90%] side_scroll bg-sky-200'>
          {
          memos &&
          memos.map((e)=>{
            console.log(e);
            return(
              <h1>{e[3]}</h1>
            )
            
          })
        }
          </div>
        </div>
        <div className='w-2/3 h-full py-4'>
          <h1 className='text-4xl text-center font-bold'>Buy Me a Coffee</h1>
        <div className='w-full h-full flex align-center justify-center'>
          <div className='w-3/5 rounded-lg shadow-xl h-4/5 bg-sky-200 mt-6 items-center flex flex-col'>
            <h2 className='text-3xl font-bold mt-7'>Pay {value * 0.001} eth</h2>
              <div className='w-4/5 py-8 bg-slate-50 h-1/6 my-3 rounded-2xl flex items-center justify-around'>
              <SiBuymeacoffee style={{fontSize:"2.5rem",color:"brown"}}/>
              <button  className={`px-4 py-3 border-black border rounded-xl ${value==1 ? 'bg-yellow-200' : 'bg-yellow-50'}`} onClick={()=>{setValue(1)}} >1</button>
              <button className={`px-4 py-3 border-black border rounded-xl ${value==3 ? "bg-yellow-200" : "bg-yellow-50"} `} onClick={()=>{
                setValue(3)
              }}>3</button>
              <button className={`px-4 py-3 border-black border rounded-xl ${value==5 ? "bg-yellow-200" : "bg-yellow-50"} `} onClick={()=>{
                setValue(5)
              }}>5</button>
              </div>
              <div className='w-4/5'>
                <input type="text" placeholder='Unknown' onChange={(e)=>{setName(e.target.value)}}  className="py-5 px-3 rounded-2xl w-full outline-none" />
              </div>
              <div className='w-4/5'>
                <input name="" className='mt-4 rounded-2xl outline-none px-4 w-full py-5' placeholder='Enjoy Your Coffee' id="" />
              </div>
              <button onClick={buyCoffee} className=' mt-3 w-4/5 px-5 py-3 bg-sky-600 rounded-md  text-white'>Buy Coffee</button>
          </div>

        </div>
        {/* <button onClick={buyCoffee}>Buy Coffee</button> */}
        
         </div>
        </div>
        
        
      </main>
    </div>
  )
}
