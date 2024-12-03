function storageAvailable( type ) {
    let storage;
    try {
      storage = window[ type ];
      const x = "__storage_test__";
      storage.setItem( x, x );
      storage.removeItem( x );
      console.log( "storage test passed" );
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
}

export function setData( projects ) {
    if (storageAvailable( "localStorage" )) {
        localStorage.setItem( "userData", JSON.stringify( projects ));
        console.log( "setting data..." );
        return true;
      } else {
        return false;
      }
}

export function getData() {
    const storedData = localStorage.getItem( "userData" );

    if( storedData ) {
        const userData = JSON.parse( storedData );
        console.log( "Existing data found.", userData );
        // let projects = userData;
        return userData;
    } 
    
    /* else {
        console.log("No existing data found in localStorage");
        setData();
    } */
}


export function clearData() {   
    localStorage.clear();
}
