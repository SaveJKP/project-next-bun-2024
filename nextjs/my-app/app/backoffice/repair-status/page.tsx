"use client";

import { useState, useEffect } from "react";
import Modal from "../../components/modal";
import Swal from "sweetalert2";
import config from "../../config";
import axios from "axios";
import dayjs from "dayjs";

export default function Page() {
  const [repairRecords, setRepairRecords] = useState([]); // repairRecords
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    fetchRepairRecords();
  });

  const fetchRepairRecords = async () => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/api/repairRecord/list`
      );
      setRepairRecords(response.data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const getStatusName = (status: string) => {
    switch (status) {
      case "active":
        return "รอซ่อม";
      case "pending":
        return "รอลูกค้ายืนยัน";
      case "repairing":
        return "กำลังซ่อม";
      case "done":
        return "ซ่อมเสร็จ";
      case "cancel":
        return "ยกเลิก";
      case "complete":
        return "ลูกค้ามารับอุปกรณ์";
      default:
        return "รอซ่อม";
    }
  };

  const handleEdit = (id: number) => {
    setId(id);
    setShowModal(true);
  };
  return (
    <>
      <div className="card">
        <h1>สถานะการซ่อม</h1>
        <div className="card-body">
          <table className="table mt-3">
            <thead>
              <tr>
                <th>ชื่อลูกค้า</th>
                <th>เบอร์โทรศัพท์</th>
                <th>อุปกรณ์</th>
                <th>อาการ</th>
                <th>วันที่รับซ่อม</th>
                <th>วันที่ซ่อมเสร็จ</th>
                <th>สถานะ</th>
                <th style={{ width: "170px" }} className="text-center">
                  จัดการสถานะ
                </th>
              </tr>
            </thead>
            <tbody>
              {repairRecords.map((repairRecord: any) => (
                <tr key={repairRecord.id}>
                  <td>{repairRecord.customerName}</td>
                  <td>{repairRecord.customerPhone}</td>
                  <td>{repairRecord.deviceSerial}</td>
                  <td>{repairRecord.problem}</td>
                  <td>{dayjs(repairRecord.createdAt).format("YYYY-MM-DD")}</td>
                  <td>
                    {repairRecord.endJobDate
                      ? dayjs(repairRecord.endJobDate).format("YYYY-MM-DD")
                      : "-"}
                  </td>
                  <td>{getStatusName(repairRecord.status)}</td>
                  <td className="text-center">
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(repairRecord.id)}
                    >
                      <i className="fa-solid fa-edit mr-3"></i>ปรับสถานะ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        title="ปรับสถานะ"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <div>
          <div>
            เลือกสถานะ
            <div>
              <select className="form-control w-full"></select>
              <option value="active">รอซ่อม</option>
              <option value="pending">รอลูกค้ายืนยัน</option>
              <option value="repairing">กำลังซ่อม</option>
              <option value="done">ซ่อมเสร็จ</option>
              <option value="cancel">ยกเลิก</option>
              <option value="complete">ลูกค้ามารับอุปกรณ์</option>
            </div>
            <div className="mt-3">
              <div>การแก้ไข</div>
              <textarea className="form-control w-full" rows={5}></textarea>
            </div>
            <button className="btn-primary mt-3">
              <i className="fa-solid fa-save mr-3">บันทึก</i>
              บันทึก
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
