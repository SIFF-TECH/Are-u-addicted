import React from "react"







  export default function DocCard(props){


    return(

        <div className="CardDoc">
            <img src="" alt="" />
            <div>
                <h3>{props.name}</h3>
                <p>{props.spiciality}</p>
            </div>
            <div className="rating">
                <input type="checkbox" name="ratung" id="5" /><label for="5">☆</label>
                <input type="checkbox" name="ratung" id="4" /><label for="4">☆</label>
                <input type="checkbox" name="ratung" id="3" /><label for="3">☆</label>
                <input type="checkbox" name="ratung" id="2" /><label for="2">☆</label>
                <input type="checkbox" name="ratung" id="1" /><label for="1">☆</label>
            </div>
            <button>Send A message</button>
        </div>
    )
  }