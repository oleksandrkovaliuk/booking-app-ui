"use client";
import React from "react";

import ManageLayout from "../../manageLayout";
import { CreateForm } from "../../components/createForm/createForm";

export default function CreateListing() {
  return (
    <ManageLayout isCutted={true}>
      <CreateForm />
    </ManageLayout>
  );
}
