<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<title>Cloud Computing ROI Calculator | Cloud Computing Management Platform by RightScale</title> 	
	<meta name="description" content="Use the RightScale Cloud Computing ROI Calculator to see how much you’ll save using the cloud with the RightScale Cloud Management Platform" /> <meta name="keywords" content="Cloud Computing, Cloud Computing ROI, Cloud Computing Return On Investment, RightScale ROI Calculator, RightScale Cloud Management Platform" /> 
	<meta name="keywords" content="" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link href="css/reset.css" media="screen" rel="stylesheet" type="text/css" />
	<link href="css/main.css" media="screen" rel="stylesheet" type="text/css" />
	<link href="css/calculator-styles.css" media="screen" rel="stylesheet" type="text/css" />
	<!--[if lte IE 7]><link href="/stylesheets/ie.css" media="screen" rel="stylesheet" type="text/css" /><![endif]-->
    	<!--[if lte IE 8]><link href="/stylesheets/ie8.css" media="screen" rel="stylesheet" type="text/css" /><![endif]-->

    <link type="text/css" href="css/ui-lightness/jquery-ui-1.8.4.custom.css" rel="Stylesheet" />
	 <style type="text/css">
	  .js .js-hide { display: none; }
	 </style>
	<script type="text/javascript">document.documentElement.className = 'js';</script>
    <script type="text/javascript" src="js/jquery-1.4.2.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui-1.8.4.custom.min.js"></script>
    <script src="calculator.js" type="text/javascript"></script>
	
</head>

<body id="productPricing" class="oneColumn">
<div id="container">
	<?php include("includes/navigation.php"); ?>
	<div id="masthead">
		<h1>Cloud Computing ROI Calculator</h1>
	</div><!-- //End Masthead -->

	<div id="main">
		<div id="mainOneColumn">
			<div id="breadcrumb">
            		<ul>
	            <li><a href="/">Home</a></li>
	            <li><a href="/info_center/">Cloud Resources</a></li>
	            <li>Cloud Computing ROI Calculator</li>
	            </ul>
			</div>
			<div id="calculator-banner"><h2>How will you use the cloud?</h2></div>
			<div id="calculator-banner-results" class="js-hide"><h2>Your Savings Results</h2></div>
			<div id="left-column-wrap">
				<div id="left-column-bottom">
				<div id="left-column-top">
				<div id="left-column-middle">
					<h2 id="calculator-header">Calculate Your Cloud Computing Cost Savings</h2>
					    <input id="reset_to_default" type="button" name="reset_to_default" value="" />
					<h2 id="savings" class="js-hide">You can save <span id="annual_average_savings">#</span> per year using the cloud with RightScale</h2>
				<div id="form-bottom">
				<div id="form-top">
					<form action="" method="post" name="form" id="calculator">
					<div class="service-deployment drop-downs">
					<h3>Service you are deploying? <img src="images/roi-calculator-help.png" alt="" class="calculator-help" /></h3>
					<select id="use">
					  <option value="content_delivery" SELECTED>Content Delivery</option>
					  <option value="web_application">Web Application</option>
					  <option value="web_server">Web Server</option>
					  <option value="collaboration_server">Collaboration Server</option>
					  <option value="dev_test">Dev &amp; Test Server</option>
					  <option value="grid_computing">Grid Computing </option>
					</select>
					</div>
					<div id="slider-wrap" class="drop-downs">
					  <h3 id="slider_label">Size of Deployment? <img src="images/roi-calculator-help.png" alt="" class="calculator-help" /></h3> 
					<div id="slider"></div>
					<input type="text" id="deployment_size" class="report_input" />
					</div>

					<div id="peak-usage">
					  <h3>Monthly peak usage? <img src="images/roi-calculator-help.png" alt="" class="calculator-help" /></h3>
					  <div class="usage-input two-lines">
					    <label for="compute_units">Compute Units</label> <input type="text" id="compute_units" name="compute_units" class="numeric" /> 
					    <p>Virtualized 1.2Ghz core, 1.7GB, 160GB storage</p>
					  </div>
					  <div class="usage-input two-lines">
					    <label for="data_storage">Data Storage</label> <input type="text" id="data_storage" name="data_storage" class="numeric" /> 
					    <p class="short">GB</p>
					  </div>
					  <div class="usage-input">
					    <label for="mountable_data_storage">Mountable Storage</label> <input type="text" id="mountable_data_storage" name="mountable_data_storage" class="numeric" /> 
					    <p class="short">GB</p>
					  </div>
					  <div class="usage-input">
					    <label for="bandwidth_inbound">Bandwidth Inbound</label> <input type="text" id="bandwidth_inbound" name="bandwidth_inbound" class="numeric" /> 
					    <p class="short">GB/mo</p>
					  </div>
					  <div class="usage-input">
					    <label for="bandwidth_outbound">Bandwidth Outbound</label> <input type="text" id="bandwidth_outbound" name="bandwidth_outbound" class="numeric" /> 
					    <p class="short">GB/mo</p>
					  </div>
					  <div class="usage-input">
					    <label for="load_balancers">Load Balancers</label> <input type="text" id="load_balancers" name="load_balancers" class="numeric" /> 
					  </div>
					</div>
					<div class="drop-downs">
					<h3>Demand for service? <img src="images/roi-calculator-help.png" alt="" class="calculator-help" /></h3>
					<select id="demand">
					  <option value="constant_load" SELECTED>Constant Load</option>
					  <option value="high_throughput">High Throughput</option>
					  <option value="predictable_burst">Predictable Burst</option>
					  <option value="unpredictable_burst">Unpredictable Burst</option>
					</select>
					</div>
					<div class="drop-downs">
					<h3>IaaS cloud you are considering? <img src="images/roi-calculator-help.png" alt="" class="calculator-help" /></h3>
					<select id="cloud">
					  <option value="amazon" SELECTED>Amazon</option>
					  <option value="rackspace">Rackspace</option>
					  <option value="go_grid">GoGrid</option>
					</select>
					</div>
					<div class="drop-downs">
					<h3>Hypervisor you are using? <img src="images/roi-calculator-help.png" alt="" class="calculator-help" /></h3>
					<select id="hypervisor">
					  <option value="none" selected>None</option>
					  <option value="vsphere_free">VSphere Free</option>
					  <option value="vsphere_essentials">VSphere Essentials</option>
					  <option value="vsphere_standard">VSphere Standard</option>
					  <option value="citrix_xen_free">Citrix XenServer Free</option>
					  <option value="citrix_xen_advanced">Citrix XenServer Advanced</option>
					  <option value="ms_hyper_v">Microsoft Hyper-V</option>
					  <option value="xen">Xen</option>
					  <option value="kvm">KVM</option>
					  <option value="other">Other</option>
					</select>
					</div>
					<div class="drop-downs">
					<h3>OS you will use? <img src="images/roi-calculator-help.png" alt="" class="calculator-help" /></h3>
					<select id="os">
					  <option value="fedora" selected>Fedora</option>
					  <option value="suse">SUSE</option>
					  <option value="ubuntu">Ubuntu</option>
					  <option value="centos">CentOS</option>
					  <option value="debian">Debian</option>
					  <option value="gentoo">Gentoo</option>
					  <option value="other_linux">Other Linux</option>
					  <option value="redhat_enterprise">Red Hat Enterprise</option>
					  <option value="windows_server">Windows Server</option>
					</select>
					</div>
					<img src="images/roi-calculate-results.gif" id="submit" alt="" />
				    </form>
				</div>
				</div>
				<!-- End Form Bottom -->
				<div id="calculator-report" class="report js-hide">
					<h3>Utility Pricing</h3>
					<p class="label">Pay for what you use:</p>
					<p><span>Convert <span id="percent_of_servers">#</span>%</span> of your servers to flexible, on-demand instances.</p>
					<p class="label">Pay as you go:</p>
					<p><span>Avoid</span> <span id="hardware_cloud_cost_savings">#</span> in up-front costs.
					<h3>Shared, Flexible Capacity</h3>
					<p class="label">Server utilization:</p>
					<p>Increase your server utilization from <span id="original_server_utilization">#</span><span>%</span> to <span id="cloud_server_utilization">#</span><span>%</span>.</p>
					<h3>Datacenter Optimization, Scale and Reliability</h3>
					<p class="label">Facility, hardware &amp; power cost:</p>
					<p>Reduce your cost per compute hour from <span id="original_facility_cost">#</span> to <span id="cloud_facility_cost">#</span> in the cloud.</p>
					<p class="label">Down-time:</p>
					<p>Reduce down-time by <span id="server_downtime_hours">#</span> server-hours annually.</p>
					<h3>Agility</h3>
					<p class="label">New deployment time:</p>
					<p>Launch new production deployments in <span id="deployment_time_percentage">#</span><span>%</span> less time.</p>
					<p class="label">Provisioning time:</p>
					<p>Reduce provisioning time by <span id="provisioning_time">#</span> minutes.</p>
					<p class="label">Admin resources:</p>
					<p>Manage cloud infrastructure with <span id="admin_hours">#</span> fewer admin hours.</p>
					<h3>Control</h3>
					<p class="label">Cost transparency:</p>
					<p>Know your monthly spend: <span id="monthly_computing_spend">#</span> for computing and <span id="monthly_storage_spend">#</span> for storage.</p>
			</div>
			<!-- End Report -->
				</div>
				</div>
				</div>
				<!-- End Left Column -->
						<img src="images/roi-calculator-recalculate.gif" alt="" id="recalculate" class="js-hide" />
						</div>
				<div id="right-column" class="right-column-form">
					<h2>Why Use RightScale?</h2>
					<p>The <strong>pay-as-you go cloud computing model</strong> is equally attractive to small- and mid-size businesses as well as enterprises for the simple reason that it <strong>reduces capital expenditures</strong> and <strong>provides economies of scale</strong> not possible with the traditional datacenter model. But in their rush to move their applications to the cloud, <strong>companies often fail to factor in the expertise and time needed to transition to the cloud</strong> when using the cloud infrastructure provider’s tools or application programming interface (API).</p>

					<p>The <strong>RightScale Cloud Management Platform reduces the time</strong> associated with managing your cloud infrastructure <strong>by more than 50 percent</strong>. We’ve developed the <strong>Cloud Computing ROI Calculator</strong> to help you calculate the cost savings you’ll achieve by managing your cloud infrastructure with RightScale.</p>
					
					</div>
					<!-- End Right Column -->
					<div id="right-column" class="right-column-report js-hide">
						<h2>How RightScale Delivers Savings</h2>
						<p>Cloud computing provides a combination of cost and agility savings. Most companies find that, <strong>coupled with a cloud management solution like RightScale</strong>, they can <strong>quickly achieve significant savings by moving to the cloud</strong>.</p>
						<p>RightScale reduces the complexity of moving your applications to the cloud by delivering:</p>
						<ul>
						<li><strong>Agility:</strong> Launch and manage resources in<br /> minutes — not days or weeks.</li>
						<li><strong>Choice:</strong> Architect to meet your requirements.</li>
						<li><strong>Control:</strong> Monitor and manage performance, users and costs.</li>
						</ul>

						<p>For more details on the time and cost savings you’ll achieve with RightScale, download our <a href="/info_center/white-papers/quantifying-the-benefits-of-rightscale.php">Quantifying the Benefits of the RightScale Cloud Management Platform white paper</a>.
						</p>
						<p><a href="/info_center/white-papers/quantifying-the-benefits-of-rightscale.php"><img src="images/download-white-paper.gif" alt="" /></a></p>

						</div>
						<!-- End Right Column -->
						<script type="text/javascript">
						                 $(window).bind('load', function() {
						                         $('.js-hide').removeClass('js-hide');
						                 });
						         </script>
					</div>
							<?php include("includes/footer.php"); ?>