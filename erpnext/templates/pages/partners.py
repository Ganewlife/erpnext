# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# License: GNU General Public License v3. See license.txt


# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors # License: GNU General Public License v3. See license.txt


import frappe

page_title = "Partners"


def get_context(context):
     selected_region = frappe.request.args.get("selected_region")
     selected_partner = frappe.request.args.get("selected_partner")
     #selected_region = "Cotonou"
     # print("Selected Region:", selected_region)
     #frappe.msgprint("Selected Region: {}".format(selected_region))
     selected_region = selected_region if selected_region is not None else "all"
     selected_partner = selected_partner if selected_partner is not None else "all"
     # Utilise une requête conditionnelle pour filtrer les partenaires en fonction de la région sélectionnée
     if selected_region == "all":
         if selected_partner == "all":
             partners = frappe.db.sql(
                     """SELECT * FROM `tabSales Partner`
                     WHERE show_in_website=1
                     ORDER BY name ASC""",
                     as_dict=True,
                     update={"no_cache": True}
                 )
         else:
             partners = frappe.db.sql(
             """SELECT * FROM `tabSales Partner`
             WHERE show_in_website=1 AND partner_type = %s
             ORDER BY name ASC""",
             (selected_partner,),
             as_dict=True,
             update={"no_cache": True}
         )
     else:
         if selected_partner == "all":
             partners = frappe.db.sql(
                 """SELECT * FROM `tabSales Partner`
                 WHERE show_in_website=1 AND territory = %s
                 ORDER BY name ASC""",
                 (selected_region,),
                 as_dict=True,
                 update={"no_cache": True}
             )
         else:
             partners = frappe.db.sql(
                 """SELECT * FROM `tabSales Partner`
                 WHERE show_in_website=1 AND territory = %s AND partner_type = %s
                 ORDER BY name ASC""",
                 (selected_region,selected_partner),
                 as_dict=True,
                 update={"no_cache": True}
             )

     #partners = frappe.db.sql(
     #    """SELECT * FROM `tabSales Partner`
     #    WHERE show_in_website=1 AND territory = `Tous les territoires`
     #    ORDER BY name ASC""",
     #    as_dict=True,
     #)

     territories = frappe.db.sql(
         """SELECT territory_name FROM `tabTerritory` ORDER BY territory_name ASC""",
         as_dict=True,
     )

     sales = frappe.db.sql(
         """SELECT name FROM `tabSales Partner Type` ORDER BY name ASC""",
         as_dict=True,
     )

     return {
         "partners": partners,
         "title": page_title,
         "territory": territories,
         "sales": sales,
         "selected_region": selected_region,
         "selected_partner": selected_partner,
     }

