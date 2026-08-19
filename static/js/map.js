/* =====================================================
   IKS KNOWLEDGE MAP
===================================================== */

const mapRegions =
    document.querySelectorAll(".map-region");

const regionContents =
    document.querySelectorAll(".region-content");

const defaultRegion =
    document.getElementById("defaultRegion");


mapRegions.forEach(function (region) {

    region.addEventListener("click", function () {

        const selectedRegion =
            region.dataset.region;


        /* Remove active from buttons */

        mapRegions.forEach(function (item) {

            item.classList.remove("active");

        });


        /* Activate selected button */

        region.classList.add("active");


        /* Hide default message */

        if (defaultRegion) {

            defaultRegion.style.display = "none";

        }


        /* Hide all region content */

        regionContents.forEach(function (content) {

            content.classList.remove("active");

        });


        /* Show selected region */

        const selectedContent =
            document.getElementById(selectedRegion);


        if (selectedContent) {

            selectedContent.classList.add("active");

        }

    });

});