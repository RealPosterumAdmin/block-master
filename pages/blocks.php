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
                        <h4 class="card-title">Primary Table</h4>
                        <h6 class="card-subtitle">To use add class <code>.bg-primary .text-white</code> in the
                            <code>&lt;thead&gt;</code>.</h6>
                        <div class="table-responsive">
                            <table class="table">
                                <thead class="bg-primary text-white">
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Nigam</td>
                                    <td>Eichmann</td>
                                    <td>@Sonu</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Deshmukh</td>
                                    <td>Prohaska</td>
                                    <td>@Genelia</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Roshan</td>
                                    <td>Rogahn</td>
                                    <td>@Hritik</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
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
    jQuery(document).ready(function ($) {
        var html, css, js;

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