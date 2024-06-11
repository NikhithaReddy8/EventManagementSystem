import { useRef, useState } from "react";
import "./AddEvent.css"
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { useNavigate,useLocation } from "react-router-dom";

const AddEvent = () => 
{

    const location = useLocation();
    const clubData = location.state.clubData;
    const clubName = clubData.clubName;

    const [eventName,setEventName] = useState('');
    const [Tagline,setTagline] = useState('');
    const [Venue,setVenue] = useState('');
    const [Date,setDate] = useState('');
    const [Time,setTime] = useState('');
    const [imageUrl,setImageUrl] = useState('');
    const [description,setDescription] = useState('');
    const [scoordinatorName,setScoordinatorName] = useState('');
    const [scoordinatorEmail,setScoordinatorEmail] = useState('');
    const [fcoordinatorName,setFcoordinatorName] = useState('');
    const [fcoordinatorEmail,setFcoordinatorEmail] = useState('');
    const [branchs,setBranch] = useState('');

    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const eventname = useRef();
    const scoordinator = useRef();
    const scoordinatoremail = useRef();
    const fcoordinator = useRef();
    const fcoordinatoremail = useRef();
    const taglinee = useRef();
    const Venues = useRef();
    const dates = useRef();
    const times = useRef();
    const desc = useRef();
    const Branch = useRef();

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            setUploading(true);
          const formData = new FormData();
          formData.append('image', selectedFile);
          await axios.post(`http://localhost:3001/api/image`, formData)
          .then(res => {
                setSelectedFile(null);
                fileInputRef.current.value = null;
                setImageUrl(res.data);
          })

        } 
        catch (err) {
          console.error('Error uploading image:', err);
        } 
        finally{
            setUploading(false);
        }
      };
    
      const handleSubmit = async(e) => {
        e.preventDefault();
    
        const eventName = eventname.current.value;
        const tagline = taglinee.current.value;
        const venue = Venues.current.value;
        const date = dates.current.value;
        const time = times.current.value;
        const description = desc.current.value;
        const studentCoordinator = scoordinator.current.value;
        const studentCoordinatorEmail = scoordinatoremail.current.value;
        const facultyCoordinator = fcoordinator.current.value;
        const facultyCoordinatorEmail = fcoordinatoremail.current.value;
        if(clubName !== 'DeptClub')
        {
            try {
                await axios.post('http://localhost:3001/add/event',{eventName,clubName,tagline,studentCoordinator,studentCoordinatorEmail,facultyCoordinator,facultyCoordinatorEmail,venue,date,time,imageUrl,description})
                .then(res => {
                    alert("Event Added Successfully");
                    navigate('/club',{state:{clubData:clubData}})
                })
            }
            
            catch(err) {
                console.log(err);
                alert("Event not added");
            }
        }
        else 
        {
            const branch = Branch.current.value;
            try {
                await axios.post('http://localhost:3001/add/dept/event',{eventName,clubName,tagline,studentCoordinator,studentCoordinatorEmail,facultyCoordinator,facultyCoordinatorEmail,venue,date,time,imageUrl,description,branch})
                .then(res => {
                    if(res.data === "Success") {
                    alert("Event Added Successfully")
                    navigate('/deptclub',{state:{clubData:clubData}})
                    }
                    else{
                        alert("Failed to Add Event")
                    }
                })
            }
            
            catch(err) {
                alert("Department Event not added");
            }
        }
    
    }

    const handleDeleteEvent = () => {
        navigate("/deleteevent",{state:{clubData:clubData}})
    }
    
    const clearFileInput = () => {
        const fileInput = document.getElementById("file-input");
        fileInput.value = ""; 
    };

    return (
        <div className="addEvent">
            <div className="addevent">
                <h1>Add Event</h1>
                <div className="eventname">
                    <label>Event Name</label><input className="add-event-input" type="text" placeholder="Enter Event Name" value={eventName} ref={eventname} onChange={(e)=>setEventName(e.target.value)} required=""/>
                </div>
                <div>
                    <label>Tag Line</label><input placeholder="Tag line" type="text" ref={taglinee} value={Tagline} onChange={(e)=>setTagline(e.target.value)} />
                </div>
                {clubName==="DeptClub" ?
                (
                    <div>
                    <label>Branch</label>
                    <select ref={Branch} value={branchs} onChange={(e) => setBranch(e.target.value)} required="">
                        <option >Select branch</option><option >PUC</option><option >CSE</option><option >ECE</option><option >EEE</option>
                        <option >MECH</option><option >CIVIL</option><option >CHEM</option><option>MME</option>
                    </select>
                </div>
                ):
                (
                    <div></div>
                )
                }
                <div>
                    <label>Student Co-ordinator Name</label>
                    <input className="add-event-input" type="text" placeholder="Enter Co-ordinator Name" value={scoordinatorName} onChange={(e) => setScoordinatorName(e.target.value)} required="" ref={scoordinator} />
                </div>
            <div>
                <label>Student Co-ordinator Mail</label>
                <input className="add-event-input" type="text" placeholder="Enter Co-ordinator Name" value={scoordinatorEmail} onChange={(e) => setScoordinatorEmail(e.target.value)} required="" ref={scoordinatoremail} />
            </div>
                <div>
                <label>Faculty Co-ordinator Name</label><input className="add-event-input" type="text" placeholder="Enter Co-ordinator Name"  value={fcoordinatorName} onChange={(e)=>setFcoordinatorName(e.target.value)} required="" ref={fcoordinator}/>
                </div>
                <div>
                <label>Faculty Co-ordinator Mail</label><input className="add-event-input" type="text" placeholder="Enter Co-ordinator Name" value={fcoordinatorEmail} onChange={(e)=>setFcoordinatorEmail(e.target.value)} required="" ref={fcoordinatoremail}/>
                </div>
                <div>
                <label>Venue</label><input className="add-event-input" type="text" placeholder="Enter Venue" ref={Venues} value={Venue} onChange={(e)=>setVenue(e.target.value)} required=""/>
                </div>
                <div>
                <label>Date</label><input className="add-event-input" type="date"   value={Date} onChange={e => setDate(e.target.value)} required ref={dates}/>
                </div>
                <div>
                <label>Time</label><input className="add-event-input" type="time"   value={Time} onChange={e => setTime(e.target.value)} required ref={times}/>
                </div>

                <div className="file-input-container">
                    <label>Poster</label>
                    <div>
                        <input ref={fileInputRef} onChange={handleFileChange} id="file-input" type="file" required></input>
                        <span onClick={clearFileInput} className="clear-file-input">&#10006;</span>

                        {uploading ? (<Spinner animation="border" role="status">
                                    <span className="sr-only">Uploading...</span>
                                </Spinner>) : 
                        (<button  onClick={handleUpload}>Upload</button>)}
                    </div>
                </div>
                <div>
                <label>Description</label><textarea type="text" placeholder="Write something about Event"  onChange={(e)=>setDescription(e.target.value)} value={description} className="add-event-input" ref={desc} />
                </div>

                <button className="addevent-submit-btn" onClick={handleSubmit}>Submit</button>

                <div class="delete-event">
                    <span>Delete an existing Event?</span>
                    <span onClick={handleDeleteEvent}><button>Delete Event</button></span>
                </div>
            </div>
        </div>
    )
}

export default AddEvent;

