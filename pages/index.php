<?php include "header.php"; ?>
        <div class="page-wrapper">
            <!-- ============================================================== -->
            <!-- Bread crumb and right sidebar toggle -->
            <!-- ============================================================== -->
            <div class="page-breadcrumb">
                <div class="row">
                    <div class="col-7 align-self-center">
                        <h3 class="page-title text-truncate text-dark font-weight-medium mb-1">Создать новый Блок!</h3>
                        <div class="d-flex align-items-center">
                        </div>
                    </div>
                </div>
            </div>
            <!-- ============================================================== -->
            <!-- Container fluid  -->
            <!-- ============================================================== -->
            <div class="container-fluid">
                <!-- Start Page Content -->
                <!-- ============================================================== -->
                <div class="row">
                    <div class="col-12">
                        <div class="card" style="max-width: 100%">
                            <div class="card-body">

                                <h4 class="card-title mb-3">Default Tabs</h4>
                                <input id="name" class="card-title" placeholder="Block name">
                                <ul class="nav nav-tabs mb-3" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <a href="#html-tab" data-bs-toggle="tab" aria-expanded="false" class="nav-link active" aria-selected="true" role="tab">
                                            <i class="mdi mdi-home-variant d-lg-none d-block me-1"></i>
                                            <span class="d-none d-lg-block">Html</span>
                                        </a>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <a href="#css-tab" data-bs-toggle="tab" aria-expanded="true" class="nav-link" aria-selected="false" role="tab" tabindex="-1">
                                            <i class="mdi mdi-account-circle d-lg-none d-block me-1"></i>
                                            <span class="d-none d-lg-block">css</span>
                                        </a>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <a href="#js-tab" data-bs-toggle="tab" aria-expanded="false" class="nav-link" aria-selected="false" role="tab" tabindex="-1">
                                            <i class="mdi mdi-settings-outline d-lg-none d-block me-1"></i>
                                            <span class="d-none d-lg-block">js</span>
                                        </a>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <a href="#result" data-bs-toggle="tab" aria-expanded="false" class="nav-link" aria-selected="false" role="tab" tabindex="-1">
                                            <i class="mdi mdi-home-variant d-lg-none d-block me-1"></i>
                                            <span class="d-none d-lg-block">Результат</span>
                                        </a>
                                    </li>
                                </ul>

                                <div class="tab-content">

                                    <div class="tab-pane active show" id="html-tab" role="tabpanel">
                                        <textarea id="code-html" name="code-html" style="display: none"></textarea>
                                        <div id="html"></div>
                                    </div>

                                    <div class="tab-pane" id="css-tab" role="tabpanel">
                                        <textarea id="code-css" name="code-css" style="display: none"></textarea>
                                        <div id="css"></div>
                                    </div>

                                    <div class="tab-pane" id="js-tab" role="tabpanel">
                                        <textarea id="code-js" name="code-js" style="display: none"></textarea>
                                        <div id="js"></div>
                                    </div>
                                    <div class="tab-pane" id="result" role="tabpanel"></div>
                                </div>

                                <button onclick="saveBlock()" class="btn btn-rounded btn-primary">Сохранить</button>

                            </div> <!-- end card-body-->
                        </div> <!-- end card-->
                    </div>

                </div>
                <!-- end row-->


            </div>
            <!-- ============================================================== -->
            <!-- End Container fluid  -->
            <!-- ============================================================== -->
            <!-- ============================================================== -->
            <!-- footer -->
            <!-- ============================================================== -->
            <footer class="footer text-center text-muted">
                All Rights Reserved by Freedash. Designed and Developed by <a
                    href="https://adminmart.com/">Adminmart</a>.
            </footer>
            <!-- ============================================================== -->
            <!-- End footer -->
            <!-- ============================================================== -->
        </div>
        <!-- ============================================================== -->
        <!-- End Page wrapper  -->
        <!-- ============================================================== -->
    </div>
    <!-- ============================================================== -->
    <!-- End Wrapper -->
    <!-- ============================================================== -->
    <!-- End Wrapper -->
    <!-- ============================================================== -->
    <!-- All Jquery -->
    <!-- ============================================================== -->
    <script src="<?php echo plugin_dir_url( __FILE__ ); ?>assets/libs/jquery/dist/jquery.min.js"></script>
    <script src="<?php echo plugin_dir_url( __FILE__ ); ?>assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <!-- apps -->
    <!-- apps -->
    <script src="<?php echo plugin_dir_url( __FILE__ ); ?>dist/js/app-style-switcher.js"></script>
    <script src="<?php echo plugin_dir_url( __FILE__ ); ?>dist/js/feather.min.js"></script>
    <script src="<?php echo plugin_dir_url( __FILE__ ); ?>assets/libs/perfect-scrollbar/dist/perfect-scrollbar.jquery.min.js"></script>
    <script src="<?php echo plugin_dir_url( __FILE__ ); ?>dist/js/sidebarmenu.js"></script>
    <!--Custom JavaScript -->
    <script src="<?php echo plugin_dir_url( __FILE__ ); ?>dist/js/custom.min.js"></script>
    <!--This page JavaScript -->
    <script src="<?php echo plugin_dir_url( __FILE__ ); ?>assets/extra-libs/c3/d3.min.js"></script>
    <script src="<?php echo plugin_dir_url( __FILE__ ); ?>assets/extra-libs/c3/c3.min.js"></script>
<!--    <script src="--><?php //echo plugin_dir_url( __FILE__ ); ?><!--assets/libs/chartist/dist/chartist.min.js"></script>-->
<!--    <script src="--><?php //echo plugin_dir_url( __FILE__ ); ?><!--assets/libs/chartist-plugin-tooltips/dist/chartist-plugin-tooltip.min.js"></script>-->
    <script src="<?php echo plugin_dir_url( __FILE__ ); ?>assets/extra-libs/jvector/jquery-jvectormap-2.0.2.min.js"></script>
    <script src="<?php echo plugin_dir_url( __FILE__ ); ?>assets/extra-libs/jvector/jquery-jvectormap-world-mill-en.js"></script>
    <script src="<?php echo plugin_dir_url( __FILE__ ); ?>dist/js/pages/dashboards/dashboard1.min.js"></script>

        <!--CodeMirror-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.0/codemirror.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.0/mode/xml/xml.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.0/mode/javascript/javascript.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.0/mode/css/css.min.js"></script>
    <script>
        var html, css, js;
        jQuery(document).ready(function ($) {


            function initializeCodeMirror() {
                html = CodeMirror(document.getElementById("html"), {
                    lineNumbers: true,
                    mode: "htmlmixed",
                    theme: "material",
                    value: "<!DOCTYPE html>\n<html>\n<head>\n    <title>My Page</title>\n</head>\n<body>\n    <?php echo 'Hello, World!'; ?>\n</body>\n</html>"
                });

                css = CodeMirror(document.getElementById("css"), {
                    lineNumbers: true,
                    mode: "css",
                    theme: "material",
                    value: 'body {font-family: Arial, sans-serif;margin: 0;display: flex;height: 100vh;}'
                });

                js = CodeMirror(document.getElementById("js"), {
                    lineNumbers: true,
                    mode: "javascript",
                    theme: "material",
                    value: "jQuery(document).ready(function($) {$('.color-picker').wpColorPicker();});"
                });
            }

            initializeCodeMirror();

            $('a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
                var targetId = $(e.target).attr("href").substring(1);

                // Har bir tab ochilganda faqat ko'rsatilayotgan tabni yangilash
                if (targetId === "html-tab") {
                    html.refresh();
                } else if (targetId === "css-tab") {
                    css.refresh();
                } else if (targetId === "js-tab") {
                    js.refresh();
                }
            });
        });
</script>
<?php wp_footer(); ?>

</body>

</html>