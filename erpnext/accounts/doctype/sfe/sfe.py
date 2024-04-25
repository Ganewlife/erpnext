# Copyright (c) 2024, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

import frappe
from frappe import _, msgprint, throw
from frappe.model.document import Document
import requests, json


class SFE(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		adresse: DF.Data | None
		amended_from: DF.Link | None
		email: DF.Data | None
		email_compte: DF.Data
		ifu: DF.Data
		jeton: DF.SmallText | None
		lieu: DF.Data | None
		linux: DF.Check
		nim: DF.Data | None
		nom_logiciel: DF.Data | None
		nom_premons: DF.Data | None
		pays_origine: DF.Data | None
		production: DF.Check
		raison_sociale: DF.Data
		rccm: DF.Data
		societe: DF.Link | None
		telephone: DF.Phone
		titre: DF.Data | None
		version_logiciel: DF.Data | None
		ville: DF.Data | None
	# end: auto-generated types

	def sfe_availlable(self, token):
		jeton = token
		# jeton = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjMyMDE4MTA0MDE4Njl8VFMwMTAwODE5MyIsInJvbGUiOiJUYXhwYXllciIsIm5iZiI6MTcwMzg0ODgwMSwiZXhwIjoxNzE5NjYwMDAxLCJpYXQiOjE3MDM4NDg4MDEsImlzcyI6ImltcG90cy5iaiIsImF1ZCI6ImltcG90cy5iaiJ9.EJj2fqTE1wPU29Qz77MJni3Tu9a5Sd09H9Tv8fVRrQ8'
        
		url = "https://developper.impots.bj/sygmef-emcf/api/info/status"
		access_token = jeton
        # En-têtes HTTP
		headers = {
			"Authorization": f"Bearer {access_token}",
			"Content-Type": "application/json"
		}
		try:
			response = requests.get(url, headers=headers)
			response_data = response.json()
			# response.raise_for_status()  # Vérifie si la réponse contient une erreur HTTP
            # Traitez la réponse normale ici
			if response.status_code == 200:
				status = response_data.get("status")
				# print(f'Status SFE : {status}')
				# return response_data.get("status")
				return response_data
			elif response.status_code == 401:
				error = f"Jéton invalide, status code : { response.status_code }"#, http_error
				frappe.throw(error)
			else:
				frappe.msgprint(f'Response status code is : { response.status_code }')
				return None
		except requests.exceptions.ConnectionError as conn_error:
			error = f'Erreur de connexion, vous n\'avez pas accès à l\'Internet ou votre connexion est instable'#:{conn_error} 
			frappe.throw(conn_error)
   
		except json.JSONDecodeError as json_error:
			# Gérer les erreurs de décodage JSON
			error = f'Erreur de décodage JSON : {json_error}'
			frappe.throw(error)
                
		except requests.exceptions.HTTPError as http_error:
			if http_error.response.status_code == 503:
				error = f"Erreur 503, Le service en maintenance"
				frappe.throw(error)
                
			elif http_error.response.status_code == 500:
				error = "Un probleme est survenu lors du traitement de la requête "#, http_error
				frappe.throw(error)
             
			elif http_error.response.status_code == 401:
				error = "Jéton invalide "#, http_error
				frappe.throw(error)
                
			elif http_error.response.status_code == 404:
				error = "Api introuvable"#, http_error
				frappe.throw(error)
			else:
				error = f'Erreur HTTP'# http_error
				frappe.throw(error)
    
		except requests.exceptions.RequestException as req_error:
            # print("Erreur de requête :", req_error)
			frappe.throw('Erreur de requete')


	def before_validate(self):
		jeton = self.get('jeton')
		# frappe.throw(jeton)
		# jeton = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjMyMDE4MTA0MDE4Njl8VFMwMTAwODE5MyIsInJvbGUiOiJUYXhwYXllciIsIm5iZiI6MTcwMzg0ODgwMSwiZXhwIjoxNzE5NjYwMDAxLCJpYXQiOjE3MDM4NDg4MDEsImlzcyI6ImltcG90cy5iaiIsImF1ZCI6ImltcG90cy5iaiJ9.EJj2fqTE1wPU29Qz77MJni3Tu9a5Sd09H9Tv8fVRrQ8'
		data = SFE.sfe_availlable(self, jeton)
		if data.get("status") :
			self.set('ifu', data.get("ifu"))
			self.set('nim', data.get("nim"))
		else:
			frappe.throw('Jéton invalide')

	def before_submit(self):
		if self.get('production'):
			pass
		else:
			frappe.throw('Ce compte e-MeCeF est en mode developpement')
	pass
