import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

  exports.sendEvents = functions.firestore
  .document('eventList/{id}')
  .onCreate(async event => {

  	const events = event.data();
		const mtitle = events.title
		const mcontent = events.content
		
		const db = admin.firestore()
		const devicesRef = db.collection('devices')
		const devices = await devicesRef.get()
		const tokens = []
		
		devices.forEach(result => {
			const x = result.data().token;
			tokens.push(x)
		})

		const payload = {
			notification:{
				title: `${mtitle}`,
				body: `${mcontent}`,
				sound: 'default'
			}
		}

		const options = {
			priority: 'high'
		}

    return admin.messaging().sendToDevice(tokens, payload, options);
  });
