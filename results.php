<?php include("../includes/set_cookie.php"); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<title>RightScale ROI Calculator | Web-based Cloud Computing Management Platform by RightScale</title>
	<meta name="description" content="With the RightScale Cloud Management Platform, you can more easily deploy and manage business-critical applications on the cloud with new levels of automation, control, and portability." />
	<meta name="keywords" content="" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link href="/stylesheets/reset.css" media="screen" rel="stylesheet" type="text/css" />
	<link href="/stylesheets/main.css" media="screen" rel="stylesheet" type="text/css" />
	<link href="css/calculator-styles.css" media="screen" rel="stylesheet" type="text/css" />
	<!--[if lte IE 7]><link href="/stylesheets/ie.css" media="screen" rel="stylesheet" type="text/css" /><![endif]-->
    	<!--[if lte IE 8]><link href="/stylesheets/ie8.css" media="screen" rel="stylesheet" type="text/css" /><![endif]-->

    <link type="text/css" href="css/ui-lightness/jquery-ui-1.8.4.custom.css" rel="Stylesheet" />	
    <script type="text/javascript" src="js/jquery-1.4.2.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui-1.8.4.custom.min.js"></script>
    <script src="calculator.js" type="text/javascript"></script>
	
</head>

<body id="productPricing" class="oneColumn">
<div id="container">
	<?php include("../includes/navigation.php"); ?>
	<div id="masthead">
		<h1>ROI Calculator</h1>
	</div><!-- //End Masthead -->

	<div id="main">
		<div id="mainOneColumn">
			<div id="breadcrumb">
            <ul>
            <li><a href="/">Home</a></li>
            <li>ROI Calculator</li>
            </ul>
			</div>
			<h2 id="calculator-banner">How will you use the cloud?</h2>
				<div id="left-column-bottom">
				<div id="left-column-top">
				<div id="left-column-middle">
					<h2 id="calculator-header">Your Savings Results</h2>
			
						<h2 id="savings">You can save <span id="annual_average_savings">#</span> per year using the cloud with RightScale</h2>
					<div class="report">
						<h3>Utility pricing</h3>
						<p class="label">Pay for what you use:</p>
						<p>Convert <span id="percent_of_servers">#</span>% of your servers to flexible, on-demand instances.</p>
						<p class="label">Pay as you go:</p>
						<p>Avoid <span id="hardware_cloud_cost_savings">#</span> in up-front costs.
						<h3>Shared, flexible capacity</h3>
						<p class="label">Server utilization:</p>
						<p>Increase your server utilization from <span id="original_server_utilization">#</span>% to <span id="cloud_server_utilization">#</span>%.</p>
						<h3>Datacenter optimization, scale, and reliability</h3>
						<p class="label">Facility, hardware &amp; power cost:</p>
						<p>Reduce your cost per compute hour from <span id="original_facility_cost">#</span> to <span id="cloud_facility_cost">#</span> in the cloud.</p>
						<p class="label">Down-time:</p>
						<p>Reduce down-time by <span id="server_downtime_hours">#</span> server-hours annually.</p>
						<h3>Agility</h3>
						<p class="label">New deployment time:</p>
						<p>Launch new production deployments in <span id="deployment_time_percentage">#</span>% less time.</p>
						<p class="label">Provisioning time:</p>
						<p>Reduce provisioning time by <span id="provisioning_time">#</span> minutes.</p>
						<p class="label">Admin resources:</p>
						<p>Manage cloud infrastructure with <span id="admin_hours">#</span> fewer admin hours.</p>
						<h3>Control</h3>
						<p class="label">Cost transparency:</p>
						<p>Know your monthly spend: <span id="monthly_computing_spend">#</span> for computing and <span id="monthly_storage_spend">#</span> for storage.</p>
				</div>
				</div>
				</div>
				</div>
				<!-- End Left Column -->
				
				<div id="right-column">
					<h2>Why use RightScale?</h2>
					<p>RightScale offers an innovative approach to managing entire systems, or what we call deployments. Deployments are multiple servers and the connections between them across one or more clouds. Within such deployments, each server can be pre-configured and controlled using a cloud-ready RightScale ServerTemplate.</p>

					<p>A ServerTemplate contains a RightImage, which is a simple base machine image that typically contains only the operating system, along with RightScripts, which are scripts that define the role and behavior of that particular server. RightScripts may run during the boot, operational, and shutdown phases of the server’s lifecycle.</p>
					</div>
					<!-- End Right Column -->
<!-- 
				    <div class="report">
					
				    </div>
				-->
					</div>
							<?php include("../includes/footer.php"); ?>