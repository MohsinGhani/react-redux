import { db, firestoreDb } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  firestoreDb.collection("users").doc(id).set({
    id,
    username,
    email
  })

export const onceGetUsers = () =>
  db.ref('users').once('value');

// bus query
export const doCreateBusInCompany = (bid, cid, bus_name, date_created, no_of_seats) =>
  new Promise((res, rej) => {
    let busRef = firestoreDb.collection("Buses").doc(bid);
    busRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          rej(`bus with id ${bid} already exist`)
        }
        else {
          busRef.set({
            bid,
            cid,
            bus_name,
            date_created,
            no_of_seats
          })
          res(bid)
        }
      })
      .catch((err) => {
        rej(`error in creating doc with id ${bid}` + err)
      })
  })

// add city query
export const doAddCity = (city, date_created) =>
  new Promise((res, rej) => {
    let CitiesRef = firestoreDb.collection("Cities").doc(city);
    CitiesRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          rej(`This ${city} already exist`)
        }
        else {
          CitiesRef.set({
            city,
            date_created
          })
          res(city)
        }
      })
      .catch((err) => {
        rej(`error in creating doc with ${city}` + err)
      })
  })

// get city query
export const getCities = () =>
  new Promise((res, rej) => {
    let CitiesRef = firestoreDb.collection("Cities");
    CitiesRef.get()
      .then((querySnapshot) => {
        let arr = [];
        querySnapshot.forEach((doc) => {
          let option = { label: doc.data().city, value: doc.data().city, date_created: doc.data().date_created }
          arr.push(option)
        })
        res(arr);
      })
      .catch((error) => {
        rej("Error getting documents: ", error)
      })
  })

export const createRoute = (route_id, routeTitle, stops, aboutRoute) =>
  new Promise((res, rej) => {
    let routeObj = { route_id, title: routeTitle, aboutRoute, stops }
    let CitiesRef = firestoreDb.collection("Routes").doc(route_id);
    CitiesRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          rej(`This ${route_id} already exist`)
        }
        else {
          CitiesRef.set(routeObj)
          res(routeObj)
        }
      })
      .catch((err) => {
        rej(`error in creating doc with ${route_id}` + err)
      })
  })

export const getRoutes = () =>
  new Promise((res, rej) => {
    let CitiesRef = firestoreDb.collection("Routes");
    CitiesRef.get()
      .then((querySnapshot) => {
        let arr = [];
        querySnapshot.forEach((doc) => {
          arr.push(doc.data())
        })
        res(arr);
      })
      .catch((error) => {
        rej("Error getting documents: ", error)
      })
  })

export const getBuses = (cid) =>
  new Promise((res, rej) => {
    let busesRef = firestoreDb.collection("Buses");
    busesRef.where("cid", "==", cid)
      .get()
      .then((querySnapshot) => {
        let arr = [];
        querySnapshot.forEach((doc) => {
          arr.push(doc.data())
        })
        res(arr);
      })
      .catch((error) => {
        rej("Error getting documents: ", error)
      })
  })

export const createRide = (ride_id, ride_title, cid, bid, arrDate, depDate, route_id) =>
  new Promise((res, rej) => {
    let rideObj = { ride_id, title: ride_title, cid, bid, arrDate, depDate, route_id }
    let RideRef = firestoreDb.collection("Rides").doc(ride_id);
    RideRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          rej(`This ${ride_id} already exist`)
        }
        else {
          RideRef.set(rideObj)
          res(rideObj)
        }
      })
      .catch((err) => {
        rej(`error in creating doc with ${ride_id}` + err)
      })
  })

export const getRides = () =>
  new Promise((res, rej) => {
    let ridesRef = firestoreDb.collection("Rides");
    ridesRef.get()
      .then((querySnapshot) => {
        let arr = [];
        querySnapshot.forEach((doc) => {
          arr.push(doc.data())
        })
        res(arr);
      })
      .catch((error) => {
        rej("Error getting documents: ", error)
      })
  })

export const getRide = (ride_id) =>
  new Promise((res, rej) => {
    let rideRef = firestoreDb.collection("Rides").doc(ride_id);
    rideRef.get()
      .then((doc) => {
        if (doc.exists) {
          let ride = doc.data(); // get Ride details
          getRoute(ride.route_id).then((routeInfo) => { // geTrOUTE DETAILS
            if (routeInfo) {
              ride["routeInfo"] = routeInfo
              debugger
            }
            else {
              ride["routeInfo"] = null
            }
          })
        } else { // NO RIDE DETAILS
          res(null)
        }

      })
      .catch((error) => {
        rej("Error getting documents: ", error)
      })

  })

export const getRoute = (route_id) =>
  new Promise((res, rej) => {
    let routeRef = firestoreDb.collection("Routes").doc(route_id);
    routeRef.get()
      .then((doc) => {
        if (doc.exists) {
          res(doc.data())
        } else {
          res(null)
        }
      })
      .catch((error) => {
        rej("Error getting documents: ", error)
      })

  })

  export const getRideandItsRouteDetails = () => {
    
  }