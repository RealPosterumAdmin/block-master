<!DOCTYPE html>
<html dir="ltr" lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Tell the browser to be responsive to screen width -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- Favicon icon -->
    <link rel="icon" type="image/png" sizes="16x16" href="<?php echo plugin_dir_url( __FILE__ ); ?>assets/images/favicon.png">
    <title>Wp block construktor</title>
    <!-- Custom CSS -->
    <link href="<?php echo plugin_dir_url( __FILE__ ); ?>assets/extra-libs/c3/c3.min.css" rel="stylesheet">
    <link href="<?php echo plugin_dir_url( __FILE__ ); ?>assets/libs/chartist/dist/chartist.min.css" rel="stylesheet">
    <link href="<?php echo plugin_dir_url( __FILE__ ); ?>assets/extra-libs/jvector/jquery-jvectormap-2.0.2.css" rel="stylesheet" />
    <!-- Custom CSS -->
    <link href="<?php echo plugin_dir_url( __FILE__ ); ?>dist/css/style.min.css" rel="stylesheet">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.0/codemirror.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.0/theme/material.min.css">
    <![endif]-->
</head>

<body>
<!-- ============================================================== -->
<!-- Preloader - style you can find in spinners.css -->
<!-- ============================================================== -->
<div class="preloader">
    <div class="lds-ripple">
        <div class="lds-pos"></div>
        <div class="lds-pos"></div>
    </div>
</div>
<!-- ============================================================== -->
<!-- Main wrapper - style you can find in pages.scss -->
<!-- ============================================================== -->
<div id="main-wrapper" data-theme="light" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
     data-sidebar-position="fixed" data-header-position="fixed" data-boxed-layout="full">
    <!-- ============================================================== -->
    <!-- Topbar header - style you can find in pages.scss -->
    <!-- ============================================================== -->
    <header class="topbar" data-navbarbg="skin6">
        <nav class="navbar top-navbar navbar-expand-lg">
            <div class="navbar-header" data-logobg="skin6">
                <!-- This is for the sidebar toggle which is visible on mobile only -->
                <a class="nav-toggler waves-effect waves-light d-block d-lg-none" href="javascript:void(0)"><i
                        class="ti-menu ti-close"></i></a>
                <!-- ============================================================== -->
                <!-- Logo -->
                <!-- ============================================================== -->
                <div class="navbar-brand">
                    <!-- Logo icon -->
                    <a>
                        <img src="<?php echo plugin_dir_url( __FILE__ ); ?>assets/images/freedashDark.svg" alt="" class="img-fluid">
                    </a>
                </div>
                <!-- ============================================================== -->
                <!-- End Logo -->
                <!-- ============================================================== -->
                <!-- ============================================================== -->
                <!-- Toggle which is visible on mobile only -->
                <!-- ============================================================== -->

            </div>
            <!-- ============================================================== -->
            <!-- End Logo -->
            <!-- ============================================================== -->
            <div class="navbar-collapse collapse" id="navbarSupportedContent">
                <!-- ============================================================== -->
                <!-- toggle and nav items -->
                <!-- ============================================================== -->
                <ul class="navbar-nav float-left me-auto ms-3 ps-1">
                    <!-- Notification -->

                    <!-- End Notification -->
                    <!-- ============================================================== -->
                    <!-- create new -->
                    <!-- ============================================================== -->

                </ul>
                <!-- ============================================================== -->
                <!-- Right side toggle and nav items -->
                <!-- ============================================================== -->
                <ul class="navbar-nav float-end">
                    <!-- ============================================================== -->
                    <!-- Search -->
                    <!-- ============================================================== -->

                    <!-- ============================================================== -->
                    <!-- User profile and search -->
                    <!-- ============================================================== -->
                    <!-- ============================================================== -->
                    <!-- User profile and search -->
                    <!-- ============================================================== -->
                </ul>
            </div>
        </nav>
    </header>
    <!-- ============================================================== -->
    <!-- End Topbar header -->
    <!-- ============================================================== -->
    <!-- ============================================================== -->
    <!-- Left Sidebar - style you can find in sidebar.scss  -->
    <!-- ============================================================== -->
    <aside class="left-sidebar" data-sidebarbg="skin6">
        <!-- Sidebar scroll-->
        <div class="scroll-sidebar" data-sidebarbg="skin6">
            <!-- Sidebar navigation-->
            <nav class="sidebar-nav">
                <ul id="sidebarnav">
                    <li class="list-divider"></li>
<!--                    <li class="nav-small-cap"><span class="hide-menu">Applications</span></li>-->
                    <li class="sidebar-item">
                        <a class="sidebar-link" href="<?php echo admin_url('admin.php?page=block_master_page_index'); ?>" aria-expanded="false">
                            <span class="hide-menu">Новый Блок</span>
                        </a>
                    </li>
                    <li class="sidebar-item">
                        <a class="sidebar-link" href="<?php echo admin_url('admin.php?page=block_master_page_blocks'); ?>" aria-expanded="false">
                            <span class="hide-menu">Блоки</span>
                        </a>
                    </li>
                    <li class="sidebar-item">
                        <a class="sidebar-link" href="<?php echo admin_url('admin.php?page=block_master_page_main'); ?>" aria-expanded="false">
                            <span class="hide-menu">Настройки Шалона</span>
                        </a>
                    </li>
                    <li class="list-divider"></li>
                    <li class="sidebar-item">
                        <a class="sidebar-link sidebar-link" aria-expanded="false">
                            <span class="hide-menu">Функции</span>
                        </a>
                    </li>
<!--                    <li class="list-divider"></li>-->
                </ul>
                <div class="container">
                    <div class="row mx-auto">
                        <div class="col-5 bg-primary text-white m-1">
                            Function
                        </div>
                        <div class="col-5 bg-primary text-white m-1">
                            Function
                        </div>
                    </div>
                    <div class="row mx-auto">
                        <div class="col-5 bg-primary text-white m-1">
                            Function
                        </div>
                        <div class="col-5 bg-primary text-white m-1">
                            Function
                        </div>
                    </div>
                    <div class="row mx-auto">
                        <div class="col-5 bg-primary text-white m-1">
                            Function
                        </div>
                        <div class="col-5 bg-primary text-white m-1">
                            Function
                        </div>
                    </div>
                </div>
            </nav>
            <!-- End Sidebar navigation -->
        </div>
        <!-- End Sidebar scroll-->
    </aside>
<?php wp_head(); ?>