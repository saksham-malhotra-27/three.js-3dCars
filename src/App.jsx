import React, {useState, useEffect, useRef } from 'react';
import './App.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import animationFinish from './assets/animationFinish.json'
import Lottie from 'lottie-react'

function App() {
  const referenceForScene = useRef(0);
  const referenceForSPEED = useRef(0);
  const referenceForPageHead = useRef(0);

  const [selectedItem, setSelectedItem] = useState('Porsche');

  const handleItemClick = (item, x,y,z) => {
    setSelectedItem(item);
    const renderArea = document.querySelector('.renderArea')
    renderArea.innerHTML='';
    const { clientWidth, clientHeight } = renderArea;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, clientWidth / clientHeight, 0.1, 10000);
    const renderer = new THREE.WebGLRenderer();
    const controls = new OrbitControls(camera, renderer.domElement);

    // Set up renderer size
    renderer.setSize(clientWidth,clientHeight);
    renderer.setClearColor(0xffffff); // Set background color to white
    
    const renderingArea = document.querySelector('.renderArea');

    if (renderingArea) {
      renderingArea.appendChild(renderer.domElement);
    } else {
      console.error('Element with id "forPorsche" not found.');
    }

    // Set initial camera position
    camera.position.z = z;
    camera.position.y=y;
    camera.position.x=x

    // Enable orbit controls
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;
      // Load the GLTF model
      const loader = new GLTFLoader();
      loader.load(
        `/${item.toLowerCase()}/scene.gltf`,
        function (gltf) {
          scene.add(gltf.scene);
        },
        function (xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        function (error) {
          console.error('An error happened', error);
        }
      );

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      // Create a simple animation loop
      function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }

      // Start the animation loop
      referenceForScene.current = 1;
      animate();
  };


  useEffect(()=>{
    if(referenceForPageHead.current===0){
      
      const pagehead = document.querySelector('.pagehead');
      const txt = pagehead.textContent;
     
      const splitTxt = txt.split("");
      pagehead.textContent = ""
      pagehead.style.opacity = 0;

      const mainpage = document.querySelector('.mainpage')
      mainpage.style.opacity = 0;

      for(let i=0; i< splitTxt.length; i++){
        pagehead.innerHTML +="<span class='fade'>"+splitTxt[i]+"</span>";
      }

      let charIndex = 0;
      let timer = setInterval(
        function (){
          const span = pagehead.querySelectorAll('span')[charIndex];
          span.classList.remove('fade');
          pagehead.style.opacity = (parseFloat(pagehead.style.opacity) + 0.1).toFixed(1);
          mainpage.style.opacity = (parseFloat(mainpage.style.opacity) + 0.1).toFixed(1);
          charIndex++;
          if(charIndex===splitTxt.length){
            clearInterval(timer)
            return;
          }
        }, 100);
      referenceForPageHead.current=1;
      referenceForSPEED.current=1;
    }
  })

  useEffect(()=>{
    if(referenceForSPEED.current===1){
      
      referenceForSPEED.current===0;
    }
  })
  

 


  return (
    <>
    <div >
    <h1  className='pagehead'  style={{  zIndex:"1",borderRadius:"100px",borderBottom:"2px solid red", color:"white", textShadow:"2px 2px 8px red", boxShadow:"2px 10px 18px red", height:"auto", padding: "0px", margin: "0", textAlign: "center" }}>BLITZ CARS</h1>
    </div>
    <div className='mainpage ' style={{ display: "flex", flexFlow: "column", color: "white" , margin:"0", padding:"50px", gap:"2rem"}}>
    <div style={{textAlign: "center" }}>
      <h1 className='speed' style={{fontSize:"4rem",color:"whitesmoke"}}>
        <span style={{ color:"red"}}>MONEY </span>
         MEETS 
         <span style={{color:"red"}}> SPEED</span>
      </h1>
      <img src='https://images.unsplash.com/photo-1559999831-7deaf136d4a9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      id='speedImage'
      />
      <div className='changeFlow' style={{display:"flex", width:"100%",justifyContent:"space-between", alignItems:"center", gap:"10vh", height:"auto"}}>
      <div className='changeFlow'>
      <h1 className='fullWidth' style={{borderBottom:"1px solid red", color:"red"}}>
        Welcome to Abyss
      </h1>
      <p className='fullWidth' style={{ fontSize:"1.8rem",color:"white"}}>
      Unleash the thrill of the road with our curated collection of exceptional supercars.
      From precision engineering to unparalleled elegance, discover the epitome of automotive excellence.   
      
      </p>  

      </div>


      <div className='changeFlow' >
        <h1 className='toRed fullWidth'>
        Where Every Drive Unleashes the Extraordinary
        </h1>
      <Lottie animationData={animationFinish}/>
      </div>
      </div>
    </div>
    <img className='imgtrack' src="https://images.unsplash.com/photo-1532793962127-d6735aba5cce?q=80&w=1792&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
    <div className="sidepanelParent">
    <h1 style={{color:"red", textAlign:"center" }}> <span style={{fontSize:"2em"}}>B</span>easts & <span style={{fontSize:"2em", color:"gold"}}>B</span><span style={{color:"gold"}}>eauty</span> WE HAVE: </h1>
    <br /><br />

    <div className='renderLocation'>

    <ul className='sidepanel' style={{ listStyle: 'none', display: 'flex', gap: '10px', width: '16rem', textAlign: 'start' }}>
      <li>
        <button
          style={{
            backgroundColor: selectedItem === 'Porsche' ? 'red' : 'transparent',
            fontSize: '1.4rem',
            color: 'whitesmoke',
            border: 'none',
            width: '100%',
            textAlign: 'start',
          }}
          onClick={() => handleItemClick('Porsche', 0,0,5)}
          >
          Porsche
        </button>
      </li>
      <li>
        <button
          style={{
            backgroundColor: selectedItem === 'BMW' ? 'red' : 'transparent',
            fontSize: '1.4rem',
            color: 'whitesmoke',
            border: 'none',
            width: '100%',
            textAlign: 'start',
          }}
          onClick={() => handleItemClick('BMW', 1,2,5)}
        >
          BMW 1987
        </button>
      </li>
      
      <li>
        <button
          style={{
            backgroundColor: selectedItem === 'ferrari488pista' ? 'red' : 'transparent',
            fontSize: '1.4rem',
            color: 'whitesmoke',
            border: 'none',
            width: '100%',
            textAlign: 'start',
          }}
          onClick={() => handleItemClick('ferrari488pista',0,2,5)}
          >
          Ferrari-488-Pista
        </button>
      </li>
    </ul>

    <div className='renderArea'>
    </div>
    </div>
    </div>
   
    </div>
    <div className='footer' style={{height:"50vh", color:"white"}}>
    <h2 style={{textAlign:"center"}}>
    This is a website which i made through Three.js , this is my first project using three.js
    </h2> 
    </div>

    </>
  );
}

export default App;
