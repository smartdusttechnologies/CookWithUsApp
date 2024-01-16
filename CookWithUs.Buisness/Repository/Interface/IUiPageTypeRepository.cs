using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ServcieBooking.Buisness.Models;

namespace ServcieBooking.Buisness.Repository.Interface
{
    public interface IUiPageTypeRepository
    {
        UiPageType Create(UiPageType uiPageType);
        UiPageType Update(UiPageType uiPageType);
        int Delete(int id);
        UiPageType Get(int id);
        List<UiPageType> Get();
    }
}
