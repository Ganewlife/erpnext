# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# License: GNU General Public License v3. See license.txt


import frappe
from frappe.website.website_generator import WebsiteGenerator
page_title = "Partners"


def get_context(context):
    context.privileges_content = frappe.get_template("templates/includes/privilege.html").render()
    selected_region = frappe.request.args.get("selected_region")
    #selected_region = "Cotonou"
    print("Selected Region:", selected_region)
    #frappe.msgprint("Selected Region: {}".format(selected_region))
    selected_region = selected_region if selected_region is not None else "all"
    # Utilise une requête conditionnelle pour filtrer les partenaires en fonction de la région sélectionnée
    if selected_region == "all":
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
            WHERE show_in_website=1 AND territory = %s
            ORDER BY name ASC""",
            (selected_region,),
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
    }

