﻿using Admitted.Models;

namespace Admitted.Repositories
{
    public interface IAdmissionRepo
    {
        Admission GetByUserId(int userId);
    }
}
