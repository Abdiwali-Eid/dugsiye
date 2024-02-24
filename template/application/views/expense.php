<?php

include('header.php');
include('sidebar.php');

?>

<div class="pcoded-main-container">

<div class="pcoded-wrapper">
    <div class="pcoded-content">
        <div class="pcoded-inner-content">
            <!-- [ breadcrumb ] start -->

            <!-- [ breadcrumb ] end -->
            <div class="main-body">
                <div class="page-wrapper">
                    <!-- [ Main Content ] start -->
                   <div class="row">
                   <div class="col-xl-12">
                                    <div class="card">
                                        <div class="card-header">
                                            <h5>Basic Table</h5>
                                            <span class="d-block m-t-5">use class <code>table</code> inside table element</span>
                                        </div>
                                        <div class="card-block table-border-style">
                                            <div class="table-responsive">
                                                <button id="addNew" class="btn btn-info float-right">Add New Transaction</button>
                                                <table class="table" id="expenseTable">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Amount</th>
                                                            <th>Type</th>
                                                            <th>Description</th>
                                                            
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        
                                                    </tbody>
                                                    
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                   </div>

                   <div class="modal" tabindex="-1" role="dialog" id="expenseModal">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                          <form id="expenseForm">

                                <input type="hidden" name="update_id" id="update_id">
                                <div class="row">
                                <div class="col-sm-12">
                                <div class="alert alert-success d-none" role="alert">
                                    This is a success alert—check it out!
                                    </div>
                                    <div class="alert alert-danger d-none" role="alert">
                                    This is a danger alert—check it out!
                                    </div>
                                </div>
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label for="">Amount</label>
                                            <input type="text" name="amount" id="amount" class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label for="">Type</label>
                                            <select name="type" id="type" class="form-control">
                                                <option value="Income">
                                                    Income
                                                </option>
                                                <option value="Expense">
                                                    Expense
                                                </option>
                                            </select>
                                        
                                        </div>
                                    </div>

                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label for="">Description</label>
                                            <input type="text" name="description" id="description" class="form-control">
                                        </div>
                                    </div>
                                </div>

                          
                        </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary">Save changes</button>
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                    <!-- [ Main Content ] end -->
                </div>
            </div>
        </div>
    </div>
</div>
</div>


<?php


include 'footer.php';

?>

<script src="../js/expense.js"></script>
