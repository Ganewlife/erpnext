// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.ui.form.on('Sales Partner', {
	refresh: function(frm) {
		
		if(frm.doc.__islocal){
			hide_field(['address_html', 'contact_html', 'address_contacts']);
			frappe.contacts.clear_address_and_contact(frm);
		}
		else{
			unhide_field(['address_html', 'contact_html', 'address_contacts']);
			frappe.contacts.render_address_and_contact(frm);
		}
	},

	setup: function(frm) {
		frm.fields_dict["targets"].grid.get_field("distribution_id").get_query = function(doc, cdt, cdn){
			var row = locals[cdt][cdn];
			return {
				filters: {
					'fiscal_year': row.fiscal_year
				}
			}
		};
	},
	referral_code:function(frm){
		if (frm.doc.referral_code) {
			frm.doc.referral_code=frm.doc.referral_code.toUpperCase();
			frm.refresh_field('referral_code');
		}
	},
	
	/* redirectOnChange: function (selectElement) {
		var selectedValue = selectElement.value;

		if (selectedValue) {
			// Vous pouvez également ajouter la logique pour construire l'URL en fonction de la valeur sélectionnée
			var url = "{{ frappe.utils.get_url('/partners') }}?selected_region=" + encodeURIComponent(selectedValue);
			
			// Rediriger vers la nouvelle URL
			window.location.href = url;
		}
	} */
});
