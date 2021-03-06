define(["underscore", "backbone", "js/lib/readme", "pages/spark/app", "i18n!pages/spark/views/template/nls/header", "pages/spark/views/template/header.html"], function(_, Backbone, Readme, Coursera, _t, template) {
    "use strict";
    var header = Backbone.View.extend({
        name: "header",
        className: "coursera-header",
        attributes: {
            role: "menubar"
        },
        initialize: function() {
            this.on("view:appended", function() {
                if (Coursera.user.canAccessAdmin() || Coursera.user.can("bulk_data_low_risk")) try {
                    var dashboardLink = "data/dashboard",
                        onDashboardAlready = -1 !== window.location.pathname.indexOf(dashboardLink, window.location.pathname.length - dashboardLink.length);
                    if (!onDashboardAlready) {
                        for (var readmeLinks = $("[data-readme=data-dashboard-announcement] a"), i = 0; i < readmeLinks.length; i++) {
                            var href = window.location.protocol + "//" + window.location.hostname + "/" + Coursera.course.get("sessionName") + "/data/dashboard";
                            $(readmeLinks[i]).attr("href", href)
                        }
                        new Readme("[data-readme]")
                    }
                } catch (ex) {
                    console.error("Failed to announce data/dashboard", ex)
                }
            })
        },
        render: function() {
            return this.$el.html(template({
                _t: _t,
                course: Coursera.course,
                user: Coursera.user,
                config: Coursera.config
            })), this
        }
    });
    return header
});